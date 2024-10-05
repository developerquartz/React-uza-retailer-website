export default function Content({ details }) {
    return (
        <section className="cms-content my-5">
            {JSON.stringify(details)}
        </section>
    );
}