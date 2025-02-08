import React from "react";
import ProtectedRoute from "./ProtectedRoute";

import Layout from "../components/layout/Layout";
import Login from "../views/auth/login";

import Dashboard from "../views/dashboard/Dashboard";
import Destinasi from "../views/destinasi/Destinasi";
import TambahDestinasi from "../views/destinasi/TambahDestinasi";
import KreasiLokal from "../views/kreasilokal/KreasiLokal";
import TambahKreasiLokal from "../views/kreasilokal/TambahKreasiLokal";
import Akomodasi from "../views/akomodasi/Akomodasi";
import TambahAkomodasi from "../views/akomodasi/TambahAkomodasi";
import Acara from "../views/acara/Acara";
import TambahAcara from "../views/acara/TambahAcara";

export const DefaultRouter = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Layout> {/* Layout sebagai parent */}</Layout>
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/destinasi",
        element: <Destinasi />
      },
      {
        path: "/dashboard/tambah-destinasi",
        element: <TambahDestinasi />
      },
      {
        path: "/dashboard/kreasi-lokal",
        element: <KreasiLokal />
      },
      {
        path: "/dashboard/tambah-kreasi-lokal",
        element: <TambahKreasiLokal />
      },
      {
        path: "/dashboard/akomodasi",
        element: <Akomodasi />
      },
      {
        path: "/dashboard/tambah-akomodasi",
        element: <TambahAkomodasi />
      },
      {
        path: "/dashboard/acara",
        element: <Acara />
      },
      {
        path: "/dashboard/tambah-acara",
        element: <TambahAcara />
      }
    ]
  }
];

