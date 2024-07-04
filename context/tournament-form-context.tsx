'use client';

import React, { 
  createContext, 
  useContext, 
  useState, 
  ReactNode, 
  Dispatch, 
  SetStateAction 
} from "react";

type genderType = "MEN" | "WOMEN" | "MIXED";
type levelType = "OPEN" | "A1" | "2" | "B";

interface DivisionContextType {
  id: string;
  levelType: levelType;
  genderType: genderType;
  setGenderType: Dispatch<SetStateAction<genderType>>;
  setLevelType: Dispatch<SetStateAction<levelType>>;
  // setTeams: Dispatch<SetStateAction<string[]>>;
};

export type TournamentType = "SINGLE_ELIMINATION" | "DOUBLE_ELIMINATION" | "ROUND_ROBIN" | "HYBRID";
export type CompetitorType = "TEAM" | "PLAYER";
// type DivisionType = DivisionContextType;

interface TournamentContextType {
  eventId: string;
  title: string;
  type: TournamentType;
  competitorType: CompetitorType;
  // divisions: DivisionType[];
  setEventId: Dispatch<SetStateAction<string>>;
  setTitle: Dispatch<SetStateAction<string>>;
  setType: Dispatch<SetStateAction<TournamentType>>;
  setCompetitorType: Dispatch<SetStateAction<CompetitorType>>;
  // setDivisions: Dispatch<SetStateAction<DivisionType[]>>;
}

const TournamentContext = createContext<TournamentContextType | undefined>(undefined);

export const TournamentProvider = ({ children }: { children: ReactNode }) => {
  const [eventId, setEventId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [type, setType] = useState<TournamentType>("SINGLE_ELIMINATION");
  const [competitorType, setCompetitorType] = useState<CompetitorType>("TEAM");
  // const [divisions, setDivisions] = useState<DivisionType[]>([]);

  return (
    <TournamentContext.Provider value={{ eventId, title, type, competitorType, 
    // divisions, 
    setEventId, setTitle, setType, setCompetitorType, 
    // setDivisions 
    }}>
      {children}
    </TournamentContext.Provider>
  );
};

export const useTournamentContext = () => {
  const context = useContext(TournamentContext);
  if (context === undefined) {
    throw new Error("useTournamentContext must be used within a TournamentProvider");
  }
  return context;
};
