export default function Testimonial({ details }) {
    return (
        <section className="cms-testimonial my-5">
            {JSON.stringify(details)}
        </section>
    );
}