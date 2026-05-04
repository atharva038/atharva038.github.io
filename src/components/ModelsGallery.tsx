import { Suspense } from "react";
import Hero3DChessPiece from "@/components/ui/Hero3DChessPiece";
import {
  OrbitingTechTokens,
  HolographicProjectModules,
  MechanicalTimelineMarkers,
  SignalTerminalCube
} from "@/components/ui/Section3DModels";
import { ResponsiveCanvas, SceneLights, FloatingModel } from "@/components/ui/three-system";
import Navbar from "@/components/Navbar";
import { useState } from "react";

export default function ModelsGallery() {
  const [isTerminalMode, setIsTerminalMode] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar 
        isTerminalMode={isTerminalMode} 
        setIsTerminalMode={setIsTerminalMode} 
        onNavClick={(hash) => { window.location.href = '/' + hash }} 
      />
      <div className="pt-32 pb-20 px-8">
        <div className="flex justify-between items-end mb-12 max-w-7xl mx-auto">
          <div>
            <h1 className="text-4xl font-bold tracking-tighter uppercase mb-2">3D Models Gallery</h1>
            <p className="text-muted-foreground text-sm tracking-wide">HIGH-FIDELITY TEXTURE INSPECTION</p>
          </div>
          <a href="/" className="px-4 py-2 bg-foreground text-background text-sm font-semibold hover:bg-electric hover:text-black transition-colors">
            BACK TO PORTFOLIO
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Chess King */}
          <div className="h-[500px] border border-border bg-surface/40 relative group overflow-hidden">
            <div className="absolute top-4 left-4 z-10 opacity-60 group-hover:opacity-100 transition-opacity">
              <h2 className="text-xl font-mono text-electric">01. Hero</h2>
              <p className="text-xs text-muted-foreground mt-1">King / Black Marble</p>
            </div>
            <Hero3DChessPiece />
          </div>

          {/* Pawns */}
          <div className="h-[500px] border border-border bg-surface/40 relative group overflow-hidden">
            <div className="absolute top-4 left-4 z-10 opacity-60 group-hover:opacity-100 transition-opacity">
              <h2 className="text-xl font-mono text-electric">02. Skills</h2>
              <p className="text-xs text-muted-foreground mt-1">Tactical Pawns / Black Marble</p>
            </div>
            <ResponsiveCanvas camera={{ position: [0, 0, 4.5], fov: 45 }} minWidth={300}>
              <SceneLights intensity={1.4} />
              <FloatingModel>
                <Suspense fallback={null}>
                  <OrbitingTechTokens />
                </Suspense>
              </FloatingModel>
            </ResponsiveCanvas>
          </div>

          {/* Rook */}
          <div className="h-[500px] border border-border bg-surface/40 relative group overflow-hidden">
            <div className="absolute top-4 left-4 z-10 opacity-60 group-hover:opacity-100 transition-opacity">
              <h2 className="text-xl font-mono text-electric">03. Projects</h2>
              <p className="text-xs text-muted-foreground mt-1">Brutalist Rook / Black Marble</p>
            </div>
            <ResponsiveCanvas camera={{ position: [0, 0, 4.5], fov: 45 }} minWidth={300}>
              <SceneLights intensity={1.4} />
              <FloatingModel>
                <Suspense fallback={null}>
                  <HolographicProjectModules />
                </Suspense>
              </FloatingModel>
            </ResponsiveCanvas>
          </div>

          {/* Bishop */}
          <div className="h-[500px] border border-border bg-surface/40 relative group overflow-hidden">
            <div className="absolute top-4 left-4 z-10 opacity-60 group-hover:opacity-100 transition-opacity">
              <h2 className="text-xl font-mono text-electric">04. Experience</h2>
              <p className="text-xs text-muted-foreground mt-1">Strategic Bishop / Black Marble</p>
            </div>
            <ResponsiveCanvas camera={{ position: [0, 0, 4.5], fov: 45 }} minWidth={300}>
              <SceneLights intensity={1.4} />
              <FloatingModel>
                <Suspense fallback={null}>
                  <MechanicalTimelineMarkers />
                </Suspense>
              </FloatingModel>
            </ResponsiveCanvas>
          </div>

          {/* Queen */}
          <div className="h-[500px] border border-border bg-surface/40 relative group overflow-hidden md:col-span-2">
            <div className="absolute top-4 left-4 z-10 opacity-60 group-hover:opacity-100 transition-opacity">
              <h2 className="text-xl font-mono text-electric">05. Contact</h2>
              <p className="text-xs text-muted-foreground mt-1">Signal Queen / Black Marble</p>
            </div>
            <ResponsiveCanvas camera={{ position: [0, 0, 4.5], fov: 45 }} minWidth={300}>
              <SceneLights intensity={1.4} />
              <FloatingModel>
                <Suspense fallback={null}>
                  <SignalTerminalCube />
                </Suspense>
              </FloatingModel>
            </ResponsiveCanvas>
          </div>
        </div>
      </div>
    </div>
  );
}
