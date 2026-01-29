import { create } from 'zustand';

export interface Station {
  id: string;
  name: string;
  index: number;
  color: string;
}

export const STATIONS: Station[] = [
  { id: 'start', name: 'ATHARVA JOSHI TERMINAL', index: 0, color: '#00a8e8' },
  { id: 'skills', name: 'SKILLS STATION', index: 1, color: '#00d68f' },
  { id: 'projects', name: 'PROJECTS CENTRAL', index: 2, color: '#ffd700' },
  { id: 'achievements', name: 'ACHIEVEMENTS JUNCTION', index: 3, color: '#ff9f43' },
  { id: 'timeline', name: 'EXPERIENCE LINE', index: 4, color: '#a55eea' },
  { id: 'contact', name: 'FINAL TERMINAL', index: 5, color: '#ff6b6b' },
];

interface MetroState {
  currentStation: number;
  isTransitioning: boolean;
  isModalOpen: boolean;
  modalContent: string | null;
  hasStartedJourney: boolean;
  isMobile: boolean;
  isReducedMotion: boolean;
  scrollProgress: number;
  trainPosition: number;
  
  // Actions
  setCurrentStation: (station: number) => void;
  setIsTransitioning: (transitioning: boolean) => void;
  openModal: (content: string) => void;
  closeModal: () => void;
  startJourney: () => void;
  setIsMobile: (mobile: boolean) => void;
  setIsReducedMotion: (reduced: boolean) => void;
  setScrollProgress: (progress: number) => void;
  setTrainPosition: (position: number) => void;
  goToStation: (index: number) => void;
}

export const useMetroStore = create<MetroState>((set, get) => ({
  currentStation: 0,
  isTransitioning: false,
  isModalOpen: false,
  modalContent: null,
  hasStartedJourney: false,
  isMobile: false,
  isReducedMotion: false,
  scrollProgress: 0,
  trainPosition: 0,
  
  setCurrentStation: (station) => set({ currentStation: station }),
  
  setIsTransitioning: (transitioning) => set({ isTransitioning: transitioning }),
  
  openModal: (content) => set({ isModalOpen: true, modalContent: content }),
  
  closeModal: () => set({ isModalOpen: false, modalContent: null }),
  
  startJourney: () => set({ hasStartedJourney: true }),
  
  setIsMobile: (mobile) => set({ isMobile: mobile }),
  
  setIsReducedMotion: (reduced) => set({ isReducedMotion: reduced }),
  
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  
  setTrainPosition: (position) => set({ trainPosition: position }),
  
  goToStation: (index) => {
    const { isTransitioning } = get();
    if (isTransitioning) return;
    
    set({ 
      isTransitioning: true, 
      currentStation: index 
    });
    
    // Reset transitioning after animation
    setTimeout(() => {
      set({ isTransitioning: false });
    }, 1000);
  },
}));
