import { PlayerSearch } from "./components/PlayerSearch";
import { PlayerTable } from "./components/PlayerTable";
import { AuthButton } from "./components/AuthButton";

export default function Home() {
  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">PREMATE.gg</h1>
          <p className="text-gray-400">Valorant Oyuncu Bulma Platformu</p>
        </div>
        <div className="flex gap-4 items-center">
          <a href="#" className="text-blue-400 hover:text-blue-300">
            Oyuncu raporla
          </a>
          <a href="#" className="text-blue-400 hover:text-blue-300">
            Skin Sıralaması
          </a>
          <AuthButton />
        </div>
      </header>

      <PlayerSearch />
      <PlayerTable />
    </div>
  );
}
