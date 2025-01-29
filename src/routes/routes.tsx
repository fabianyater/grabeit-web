import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";
import { AuthProvider } from "../context/AuthProvider";
import { ShoppingListProvider } from "../context/ShoppingListsProvider";
import { AppLayout } from "../pages/layouts/AppLayout";
import { ContinuePage } from "../pages/private/Continue/ContinuePage";
import { Home } from "../pages/private/Home/Home";
import { InfoPage } from "../pages/private/Info/Info";
import { ListDetails } from "../pages/private/ListDetails/ListDetails";
import { Products } from "../pages/private/Products/Products";
import { NotFoundPage } from "../pages/public/404/NotFoundPage";
import { LoginPage } from "../pages/public/login/LoginPage";
import PrivateRoute from "./PrivateRoute";

export default function RoutesPage() {
  const queryClient = new QueryClient();

  return (
    <BrowserRouter>
      <AuthProvider>
        <ShoppingListProvider>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route element={<AppLayout />}>
                <Route
                  index
                  element={
                    <PrivateRoute>
                      <Home />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="lists/:id"
                  element={
                    <PrivateRoute>
                      <ListDetails />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="products"
                  element={
                    <PrivateRoute>
                      <Products />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="share"
                  element={
                    <PrivateRoute>
                      <Home />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="info"
                  element={
                    <PrivateRoute>
                      <InfoPage />
                    </PrivateRoute>
                  }
                />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<LoginPage />} />
              <Route
                path="oauth2/authorization/google"
                element={<ContinuePage />}
              />
            </Routes>
          </QueryClientProvider>
        </ShoppingListProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
