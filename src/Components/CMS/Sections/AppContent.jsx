export default function AppContent({ details }) {
    return (
        <section className="cms-app-content my-5">
            {JSON.stringify(details)}
        </section>
    );
}