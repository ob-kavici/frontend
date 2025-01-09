import { GameType } from "@/types/games";

export const gameTypes: GameType[] = [
    {
        id: 'connections',
        title: 'Grupe',
        description: 'Poveži besede v smiselne skupine',
        is_active: true
    },
    {
        id: 'letter-boxed',
        title: 'Besedni Zaboj',
        description: 'Ustvari besede s črkami na stranicah kvadrata',
        is_active: false
    },
    {
        id: 'strands',
        title: 'Nitke',
        description: 'Poveži sosednje črke v besede',
        is_active: false
    },
    {
        id: 'spelling-bee',
        title: 'Panj',
        description: 'Najdi čim več besed v panju',
        is_active: false
    },
]