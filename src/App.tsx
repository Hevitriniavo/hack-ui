import { RouterProvider } from "react-router-dom";
import router from "./router";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ui/components/ErrorFallback";

export default function App() {
  return <>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
    >
      <RouterProvider
        router={router}
      />
    </ErrorBoundary>
  </>
}