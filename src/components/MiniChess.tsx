import { useEffect, useMemo, useRef, useState } from "react";
import { Chess } from "chess.js";
import type { Square } from "chess.js";
import { Chessboard } from "react-chessboard";
import MagneticButton from "@/components/ui/MagneticButton";

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

type LegalTarget = {
  square: string;
  isCapture: boolean;
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
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [legalTargets, setLegalTargets] = useState<LegalTarget[]>([]);
  const [lastMoveSquares, setLastMoveSquares] = useState<{ from: string; to: string } | null>(null);
  const requestRef = useRef(0);
  const boardWrapRef = useRef<HTMLDivElement | null>(null);
  const [hasMeasured, setHasMeasured] = useState(false);

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
      const w = Math.floor(node.clientWidth);
      if (w > 0) {
        const nextWidth = Math.max(minBoardWidth, Math.min(effectiveMax, w));
        setBoardWidth(nextWidth);
        setHasMeasured(true);
      }
    };

    updateBoardWidth();

    const observer = new ResizeObserver(() => updateBoardWidth());
    observer.observe(node);

    return () => observer.disconnect();
  }, [isMobile, maxBoardWidth, minBoardWidth, mobileMaxBoardWidth]);

  const applyPosition = (nextGame: Chess) => {
    setGame(nextGame);
    setFen(nextGame.fen());
    setSelectedSquare(null);
    setLegalTargets([]);
  };

  const resetGame = () => {
    requestRef.current += 1;
    const fresh = new Chess();
    applyPosition(fresh);
    setIsThinking(false);
    setError(null);
    setLastMoveSquares(null);
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
    setLastMoveSquares({ from: move.from, to: move.to });
    setAiNote(data.text || `Stockfish played ${move.san}.`);
  };

  const fallbackEngineMove = (positionFen: string): boolean => {
    const fallback = new Chess(positionFen);
    const legal = fallback.moves({ verbose: true });
    if (legal.length === 0) return false;

    const move = legal[Math.floor(Math.random() * legal.length)];
    fallback.move(move);
    applyPosition(fallback);
    setLastMoveSquares({ from: move.from, to: move.to });
    setAiNote(`Stockfish API was unreachable. Fallback played ${move.san}.`);
    return true;
  };

  const askStockfish = async (positionFen: string) => {
    const requestId = ++requestRef.current;
    setIsThinking(true);
    setError(null);

    let lastError: unknown = null;

    try {
      for (let attempt = 0; attempt < 2; attempt += 1) {
        const controller = new AbortController();
        const timeoutId = window.setTimeout(() => controller.abort(), 6000 + attempt * 3000);

        try {
          const response = await fetch(CHESS_API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fen: positionFen, depth: 10, maxThinkingTime: 50 }),
            signal: controller.signal,
          });

          if (!response.ok) {
            throw new Error(`Chess API returned ${response.status}`);
          }

          const data = (await response.json()) as ChessApiResponse;

          if (requestId !== requestRef.current) return;
          applyAiMove(positionFen, data);
          return;
        } catch (err) {
          lastError = err;
        } finally {
          window.clearTimeout(timeoutId);
        }
      }

      if (requestId !== requestRef.current) return;
      const playedFallback = fallbackEngineMove(positionFen);
      if (!playedFallback) {
        throw lastError instanceof Error ? lastError : new Error("Could not fetch Stockfish move.");
      }
    } catch (err) {
      if (requestId !== requestRef.current) return;
      setError(err instanceof Error ? err.message : "Could not fetch Stockfish move.");
    } finally {
      if (requestId === requestRef.current) {
        setIsThinking(false);
      }
    }
  };

  const selectSquareMoves = (square: string) => {
    const availableTargets = game
      .moves({ square: square as Square, verbose: true })
      .map((move) => ({ square: move.to, isCapture: Boolean(move.captured) }));

    if (availableTargets.length === 0) {
      setSelectedSquare(null);
      setLegalTargets([]);
      return;
    }

    setSelectedSquare(square);
    setLegalTargets(availableTargets);
  };

  const tryPlayerMove = (sourceSquare: string, targetSquare: string, pieceType: string) => {
    if (isThinking || game.isGameOver() || game.turn() !== "w") return false;

    const next = new Chess(game.fen());
    const isPawnPromotion = pieceType === "wP" && targetSquare[1] === "8";
    let move;
    try {
      move = next.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: isPawnPromotion ? "q" : undefined,
      });
    } catch (_e) {
      // chess.js throws an error for illegal moves
      return false;
    }

    if (!move) return false;

    applyPosition(next);
    setLastMoveSquares({ from: move.from, to: move.to });
    setAiNote(`You played ${move.san}.`);

    if (!next.isGameOver()) {
      void askStockfish(next.fen());
    }

    return true;
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

    return tryPlayerMove(sourceSquare, targetSquare, piece.pieceType);
  };

  const onSquareClick = ({
    square,
    piece,
  }: {
    square: string;
    piece: { pieceType: string } | null;
  }) => {
    if (isThinking || game.isGameOver() || game.turn() !== "w") return;

    const clickedOwnPiece = Boolean(piece && piece.pieceType.startsWith("w"));

    if (!selectedSquare) {
      if (clickedOwnPiece && piece) {
        selectSquareMoves(square);
      }
      return;
    }

    if (square === selectedSquare) {
      setSelectedSquare(null);
      setLegalTargets([]);
      return;
    }

    const sourcePiece = game.get(selectedSquare as Square);
    const sourcePieceType = sourcePiece ? `w${sourcePiece.type.toUpperCase()}` : "";
    const moved = tryPlayerMove(selectedSquare, square, sourcePieceType);

    if (!moved) {
      if (clickedOwnPiece && piece) {
        selectSquareMoves(square);
      } else {
        setSelectedSquare(null);
        setLegalTargets([]);
      }
    }
  };

  const squareStyles = useMemo<Record<string, React.CSSProperties>>(() => {
    const styles: Record<string, React.CSSProperties> = {};

    if (lastMoveSquares) {
      styles[lastMoveSquares.from] = {
        boxShadow: "inset 0 0 0 2px rgba(56, 189, 248, 0.35)",
      };
      styles[lastMoveSquares.to] = {
        boxShadow: "inset 0 0 0 2px rgba(56, 189, 248, 0.65)",
      };
    }

    if (selectedSquare) {
      styles[selectedSquare] = {
        boxShadow: "inset 0 0 0 3px rgba(56, 189, 248, 0.9)",
      };
    }

    for (const target of legalTargets) {
      styles[target.square] = target.isCapture
        ? {
            boxShadow: "inset 0 0 0 3px rgba(248, 113, 113, 0.9)",
            background: "rgba(248, 113, 113, 0.18)",
          }
        : {
            background:
              "radial-gradient(circle, rgba(184, 103, 51, 0.42) 0%, rgba(184, 103, 51, 0.25) 30%, rgba(184, 103, 51, 0.08) 58%, rgba(184, 103, 51, 0) 72%)",
          };
    }

    return styles;
  }, [lastMoveSquares, legalTargets, selectedSquare]);

  return (
    <div
      data-no-ripple="true"
      className={`glass-panel ${isMobile ? "p-3 rounded-2xl" : "p-5 sm:p-6 rounded-3xl"}`}
    >
      <div className={`flex items-center justify-between gap-2 ${isMobile ? "mb-2" : "mb-3"}`}>
        <h4 className={`font-serif font-semibold text-foreground ${isMobile ? "text-base" : "text-lg sm:text-xl"}`}>
          Mini Chess vs Stockfish
        </h4>
        <MagneticButton
          type="button"
          onClick={resetGame}
          className={`rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-border-hover transition-colors ${
            isMobile ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-xs sm:text-sm"
          }`}
        >
          New Game
        </MagneticButton>
      </div>

      <div
        ref={boardWrapRef}
        className="mx-auto w-fit max-w-full rounded-2xl overflow-hidden border border-border bg-surface/40"
      >
        {hasMeasured ? (
          <Chessboard
            options={{
              id: "portfolio-mini-chess",
              position: fen,
              allowDragging: !isMobile && !isThinking && !game.isGameOver() && game.turn() === "w",
              onPieceDrop: onDrop,
              onSquareClick: onSquareClick,
              squareStyles: squareStyles,
              boardStyle: { width: `${boardWidth}px`, borderRadius: "0.75rem" },
              darkSquareStyle: { backgroundColor: "rgba(94, 88, 81, 0.5)" },
              lightSquareStyle: { backgroundColor: "rgba(247, 243, 236, 0.8)" },
              dropSquareStyle: { boxShadow: "inset 0 0 1px 5px rgba(184, 103, 51, 0.45)" },
              animationDurationInMs: 180,
            }}
          />
        ) : (
          <div
            style={{ width: `${boardWidth}px`, height: `${boardWidth}px` }}
            className="animate-pulse rounded-xl bg-muted/40"
          />
        )}
      </div>

      <p className={`text-muted-foreground ${isMobile ? "mt-2 text-xs" : "mt-3 text-xs sm:text-sm"}`}>{status}</p>
      <p className={`text-foreground/80 ${isMobile ? "mt-1 text-xs" : "mt-1 text-xs sm:text-sm"}`}>
        {isThinking ? "Stockfish is calculating..." : aiNote}
      </p>
      {isMobile && (
        <p className="mt-1 text-[11px] text-muted-foreground/80">Tap a piece to preview moves, then tap target square.</p>
      )}
      {error && <p className={`text-red-400 ${isMobile ? "mt-1 text-xs" : "mt-2 text-xs sm:text-sm"}`}>{error}</p>}
    </div>
  );
}
