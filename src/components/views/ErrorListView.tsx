export default function ErrorListView({ errors }: { errors: Partial<Record<string, string | string[]>> }) {
    return <ul className="text-sm text-danger">
        {Object.entries(errors).map(([tag, error]) => error?.length !== 0 && <li key={tag}>
            <b className="uppercase">{tag}</b>
            <ul className="list-disc px-6 text-xs">
                {(Array.isArray(error) ? error : [error]).map((e, i) => <li key={i}>{e}</li>)}
            </ul>
        </li>)}
    </ul>
}