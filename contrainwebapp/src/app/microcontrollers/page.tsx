'use client';

import BlockManager from "@/components/shared/BlockManager";

const Microcontrollers = ({ pageData }: { pageData: any }) => {
    const { blocks } = pageData;

    return (
        <div>
            <h1>Mikrokontrollers</h1>
            <BlockManager blocks={blocks} />
        </div>
    )
}

export default Microcontrollers;