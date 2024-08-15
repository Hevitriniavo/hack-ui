
const ErrorFallback = ({ error }: { error: Error }) => (
  <div role="alert">
    <p>Erreur : {error.message}</p>
    <button onClick={() => window.location.reload()}>Réessayer</button>
  </div>
);

export default ErrorFallback;