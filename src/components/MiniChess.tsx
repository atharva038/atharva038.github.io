import { useEffect, useMemo, useRef, useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

type ChessApiResponse = {
  lan?: string;
  from?: string;
  to?: string;
  promotion?: string;
  text?: string;
};

const CHESS_API_URL = import.meta.env.VITE_CHESS_API_URL || "https://chess-api.com/v1";

type MiniChessProps = {
  minBoardWidth?: number;
  maxBoardWidth?: number;
  mobileMaxBoardWidth?: number;
};

function statusFromGame(game: Chess): string {
  if (game.isCheckmate()) {
    return game.turn() === "w" ? "Checkmate. Black wins." : "Checkmate. White wins.";
  }

  if (game.isStalemate()) return "Draw by stalemate.";
  if (game.isThreefoldRepetition()) return "Draw by repetition.";
  if (game.isInsufficientMaterial()) return "Draw by insufficient material.";
  if (game.isDraw()) return "Draw.";
  if (game.inCheck()) return game.turn() === "w" ? "White to move (check)." : "Black to move (check).";

  return game.turn() === "w" ? "Your move (White)." : "Stockfish is thinking...";
}

export default function MiniChess({
  minBoardWidth = 220,
  maxBoardWidth = 380,
  mobileMaxBoardWidth = 300,
}: MiniChessProps) {
  const [game, setGame] = useState(() => new Chess());
  const [fen, setFen] = useState(game.fen());
  const [aiNote, setAiNote] = useState("Opening book is loaded. Make the first move.");
  const [isThinking, setIsThinking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [boardWidth, setBoardWidth] = useState(320);
  const [isMobile, setIsMobile] = useState(false);
  const requestRef = useRef(0);
  const boardWrapRef = useRef<HTMLDivElement | null>(null);

  const status = useMemo(() => statusFromGame(game), [game]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const updateMobileState = () => {
      setIsMobile(mediaQuery.matches);
    };

    updateMobileState();
    mediaQuery.addEventListener("change", updateMobileState);

    return () => mediaQuery.removeEventListener("change", updateMobileState);
  }, []);

  useEffect(() => {
    const node = boardWrapRef.current;
    if (!node) return;

    const updateBoardWidth = () => {
      const effectiveMax = isMobile ? Math.min(maxBoardWidth, mobileMaxBoardWidth) : maxBoardWidth;
      const nextWidth = Math.max(minBoardWidth, Math.min(effectiveMax, Math.floor(node.clientWidth)));
      setBoardWidth(nextWidth);
    };

    updateBoardWidth();

    const observer = new ResizeObserver(() => updateBoardWidth());
    observer.observe(node);

    return () => observer.disconnect();
  }, [isMobile, maxBoardWidth, minBoardWidth, mobileMaxBoardWidth]);

  const applyPosition = (nextGame: Chess) => {
    setGame(nextGame);
    setFen(nextGame.fen());
  };

  const resetGame = () => {
    requestRef.current += 1;
    const fresh = new Chess();
    applyPosition(fresh);
    setIsThinking(false);
    setError(null);
    setAiNote("New game started. You play White.");
  };

  const applyAiMove = (positionFen: string, data: ChessApiResponse) => {
    const next = new Chess(positionFen);
    const lan = data.lan?.trim();

    const parsedMove =
      lan && lan.length >= 4
        ? {
            from: lan.slice(0, 2),
            to: lan.slice(2, 4),
            promotion: lan.length > 4 ? lan.slice(4, 5) : undefined,
          }
        : {
            from: data.from || "",
            to: data.to || "",
            promotion: data.promotion,
          };

    const move = next.move(parsedMove);
    if (!move) {
      throw new Error("Stockfish returned an invalid move for this position.");
    }

    applyPosition(next);
    setAiNote(data.text || `Stockfish played ${move.san}.`);
  };

  const askStockfish = async (positionFen: string) => {
    const requestId = ++requestRef.current;
    setIsThinking(true);
    setError(null);

    try {
      const response = await fetch(CHESS_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fen: positionFen, depth: 12, maxThinkingTime: 60 }),
      });

      if (!response.ok) {
        throw new Error(`Chess API returned ${response.status}`);
      }

      const data = (await response.json()) as ChessApiResponse;

      if (requestId !== requestRef.current) return;
      applyAiMove(positionFen, data);
    } catch (err) {
      if (requestId !== requestRef.current) return;
      setError(err instanceof Error ? err.message : "Could not fetch Stockfish move.");
    } finally {
      if (requestId === requestRef.current) {
        setIsThinking(false);
      }
    }
  };

  const onDrop = ({
    sourceSquare,
    targetSquare,
    piece,
  }: {
    sourceSquare: string;
    targetSquare: string | null;
    piece: { pieceType: string };
  }) => {
    if (!targetSquare) return false;

    if (isThinking || game.isGameOver() || game.turn() !== "w") return false;

    const next = new Chess(game.fen());
    const isPawnPromotion = piece.pieceType === "wP" && targetSquare[1] === "8";
    const move = next.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: isPawnPromotion ? "q" : undefined,
    });

    if (!move) return false;

    applyPosition(next);
    setAiNote(`You played ${move.san}.`);

    if (!next.isGameOver()) {
      void askStockfish(next.fen());
    }

    return true;
  };

  return (
    <div className={`glass-panel ${isMobile ? "p-3 rounded-2xl" : "p-5 sm:p-6 rounded-3xl"}`}>
      <div className={`flex items-center justify-between gap-2 ${isMobile ? "mb-2" : "mb-3"}`}>
        <h4 className={`font-serif font-semibold text-foreground ${isMobile ? "text-base" : "text-lg sm:text-xl"}`}>
          Mini Chess vs Stockfish
        </h4>
        <button
          type="button"
          onClick={resetGame}
          className={`rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-border-hover transition-colors ${
            isMobile ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-xs sm:text-sm"
          }`}
        >
          New Game
        </button>
      </div>

      <div
        ref={boardWrapRef}
        className="mx-auto w-fit max-w-full rounded-2xl overflow-hidden border border-border bg-surface/40"
      >
        <Chessboard
          options={{
            id: "portfolio-mini-chess",
            position: fen,
            allowDragging: !isThinking && !game.isGameOver() && game.turn() === "w",
            onPieceDrop: onDrop,
            boardStyle: { width: `${boardWidth}px`, borderRadius: "0.75rem" },
            darkSquareStyle: { backgroundColor: "rgba(94, 88, 81, 0.5)" },
            lightSquareStyle: { backgroundColor: "rgba(247, 243, 236, 0.8)" },
            dropSquareStyle: { boxShadow: "inset 0 0 1px 5px rgba(184, 103, 51, 0.45)" },
            animationDurationInMs: 180,
          }}
        />
      </div>

      <p className={`text-muted-foreground ${isMobile ? "mt-2 text-xs" : "mt-3 text-xs sm:text-sm"}`}>{status}</p>
      <p className={`text-foreground/80 ${isMobile ? "mt-1 text-xs" : "mt-1 text-xs sm:text-sm"}`}>
        {isThinking ? "Stockfish is calculating..." : aiNote}
      </p>
      {error && <p className={`text-red-400 ${isMobile ? "mt-1 text-xs" : "mt-2 text-xs sm:text-sm"}`}>{error}</p>}
    </div>
  );
}