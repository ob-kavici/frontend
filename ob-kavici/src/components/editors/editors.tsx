import React from 'react';
import EditorCard from './editor-card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay"

const Editors: React.FC = () => {
    const editors = [
        { id: 1, name: "Editor 1", bio: "This is a bio for Editor 1." },
        { id: 2, name: "Editor 2", bio: "This is a bio for Editor 2." },
        { id: 3, name: "Editor 3", bio: "This is a bio for Editor 3." },
        { id: 4, name: "Editor 4", bio: "This is a bio for Editor 4." },
        { id: 5, name: "Editor 5", bio: "This is a bio for Editor 5." },
        { id: 6, name: "Editor 6", bio: "This is a bio for Editor 6." },
        { id: 7, name: "Editor 7", bio: "This is a bio for Editor 7." },
        { id: 8, name: "Editor 8", bio: "This is a bio for Editor 8." },
    ];


    return (
        <div className="relative flex flex-col items-center justify-center w-full">
            <h1 className="text-2xl font-cursive p-5">Editors</h1>
            <Carousel
                opts={{
                    loop: true,
                }}
                plugins={[
                    Autoplay({
                        delay: 3000,
                    }),
                ]}
                className="w-full p-4"
            >
                <CarouselContent className="ml-1">
                    {editors.map((editor) => (
                        <CarouselItem
                            key={editor.id}
                            className="p-1 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                        >
                            <EditorCard editor={editor} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-8 top-1/2 transform -translate-y-1/2" />
                <CarouselNext className="absolute right-8 top-1/2 transform -translate-y-1/2" />
            </Carousel>
        </div>

    );
};

export default Editors;
