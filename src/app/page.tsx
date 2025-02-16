import PaletteGrid from "./components/templates/PaletteGrid";
import ClientLayout from "./components/templates/Layout";

export default function Home() {
  return (
    <ClientLayout>

    <div className="w-full min-h-screen bg-white flex items-center justify-center py-10">
      <PaletteGrid />
    </div>
    </ClientLayout>
  );
}
