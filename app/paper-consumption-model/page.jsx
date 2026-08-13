export const metadata = {
  title: "Paper Consumption Model",
  description:
    "The A Sustainable Future Paper Consumption Model and paper program are available on the dedicated paper site.",
  alternates: { canonical: "https://paper.asustainablefuture.org/paper-consumption-model/" },
};

export default function PaperConsumptionModelPage() {
  return (
    <article className="program-detail paper-handoff">
      <h1>The Paper Consumption Model has a dedicated home.</h1>
      <p>
        Use the paper program site for the current model, research, resources,
        school programs, and paper-reduction guidance.
      </p>
      <a
        className="button button-primary"
        href="https://paper.asustainablefuture.org/paper-consumption-model/"
      >
        Open the Paper Consumption Model
      </a>
    </article>
  );
}
