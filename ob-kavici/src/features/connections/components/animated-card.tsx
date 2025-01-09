import React from "react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

type AnimatedCardProps = {
    card: { content: string };
    isSelected?: boolean;
    isWrong: boolean;
    onClick: () => void;
};

const AnimatedCard: React.FC<AnimatedCardProps> = ({ card, isSelected, isWrong, onClick }) => (
    <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.2 }}
    >
        <Card
            className={`h-20 flex justify-center items-center cursor-pointer transition-all ${isSelected ? "ring-2 ring-primary bg-accent" : ""
                } ${isWrong ? "animate-shake ring-2 ring-destructive" : ""}
            hover:bg-gray-200 dark:hover:bg-gray-700 text-center`}
            onClick={onClick}
        >
            <span className="font-semibold text-sm sm:text-base break-words p-2">{card.content}</span>
        </Card>
    </motion.div>
);

export default AnimatedCard;
