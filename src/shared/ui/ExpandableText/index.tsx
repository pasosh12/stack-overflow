import { useState } from 'react'
import s from './ExpandableText.module.css'
import clsx from "clsx";

type PropsType = {
    text: string
    maxLength?: number
    className: string
}
export default function ExpandableText({ text, maxLength = 50,className}: PropsType) {
    const [expanded, setExpanded] = useState(false)
    const isLong = text.length > maxLength
    const displayText = expanded || !isLong ? text : text.slice(0, maxLength)

    return (
        <div>
            <p className={clsx(s.expandable_Text, className)}>
                {displayText}
                {isLong && !expanded && '... '}
                {isLong && (
                    <>
                        <span> </span>
                        <span
                            className={s.expand_button}
                            onClick={() => setExpanded(!expanded)}
                        >
                            {expanded ? 'Hide' : 'Show more'}
                        </span>
                    </>
                )}
            </p>
        </div>
    )
}