import React, { useEffect, useState } from "react";
import Navbar from "../utils/navbar";
import { paths } from "@/config/paths";
import ProfileService from "@/services/profile-service";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface GameLayoutProps {
    game: any;
    gameTypeTitle: string;
    children: React.ReactNode;
}

export const GameLayout: React.FC<GameLayoutProps> = ({ game, gameTypeTitle, children }) => {
    const [editorUsername, setEditorUsername] = useState<string>("");
    const [stars, setStars] = useState(game?.stars || 0);
    const [solves, setSolves] = useState(game?.solves || 0);
    const [upvoted, setUpvoted] = useState(false);

    useEffect(() => {
        if (!game?.editor_id) return;

        const fetchEditorUsername = async () => {
            try {
                const profile = await ProfileService.getProfile(game.editor_id);
                setEditorUsername(profile?.username || "");
            } catch {
                setEditorUsername("");
            }
        };

        fetchEditorUsername();
    }, [game?.editor_id]);

    const toggleVote = () => {
        if (upvoted) {
            setStars((prev: number) => Math.max(prev - 1, 0));
        } else {
            setStars((prev: number) => prev + 1);
        }
        setUpvoted((prev) => !prev);

        // Uncomment for API integration
        // if (upvoted) {
        //     GamesService.downvoteGame(game.id);
        // } else {
        //     GamesService.upvoteGame(game.id);
        // }
    };

    return (
        <>
            <Navbar title="ob-kavici" linkTo={paths.games.root.getHref()} />
            <div className="container mx-auto px-4 py-4 text-center">
                {/* Game Type */}
                <h1 className="text-4xl font-bold mb-2">{gameTypeTitle}</h1>

                {/* Date */}
                <div className="text-sm text-muted-foreground mb-2">
                    {game?.game_date ? (
                        new Date(game.game_date).toLocaleDateString("sl-SI", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                        })
                    ) : (
                        <Skeleton className="h-4 w-20 mx-auto" />
                    )}
                </div>

                <div className="text-sm text-muted-foreground mb-4">
                    {editorUsername ? (
                        <Link to={paths.profile.editor.getHref(editorUsername)}>
                            <Badge variant="secondary">{editorUsername}</Badge>
                        </Link>
                    ) : (
                        <Skeleton className="h-4 w-32 mx-auto" />
                    )}
                </div>

                <div className="flex justify-center items-center gap-6 mb-6">
                    <div className="flex items-center gap-2">
                        <Button variant="outline" onClick={toggleVote}>
                            <Star className={`w-6 h-6 ${upvoted ? "text-yellow-500 fill-current" : ""}`} />
                            <span>{stars}</span>
                        </Button>
                    </div>
                </div>

                <div className="border-t border-muted my-6"></div>

                <div>{children}</div>
            </div>
        </>
    );
};
