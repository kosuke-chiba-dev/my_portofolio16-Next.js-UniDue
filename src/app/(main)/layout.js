import SideMenu from "../../components/SideMenu/SideMenu";
import TopMenu from "../../components/TopMenu/TopMenu";

export default function MainLayout({ children }) {
  return (
    <div className="flex h-screen flex-col min-[910px]:flex-row">
      <aside className="hidden min-[910px]:block w-56 shrink-0">
        <SideMenu />
      </aside>

      <header className="block min-[910px]:hidden">
        <TopMenu />
      </header>

      <main className="bg-slate-50 flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}