export default function Banner({ details }) {
    return (
        <section className="cms-banner my-5">
            {JSON.stringify(details)}
        </section>
    );
}