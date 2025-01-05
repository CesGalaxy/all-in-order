export default function ErrorListView({ errors }: { errors?: Partial<Record<string, string | string[]>> }) {
    return errors && <ul className="text-sm text-danger">
        {Object.entries(errors).map(([tag, error]) => error && error.length !== 0 && <li key={tag}>
            <b className="uppercase">{tag}</b>
            {
                Array.isArray(error)
                    ? <ul className="list-disc px-6 text-xs">
                        {error.map((e, i) => <li key={i}>{e}</li>)}
                    </ul>
                    : <span>: {error}</span>
            }
        </li>)}
    </ul>
}