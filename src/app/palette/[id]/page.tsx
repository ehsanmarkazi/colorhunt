import ColorBalls from '@/app/components/modules/ColorBalls';
import ColorBox from '@/app/components/modules/ColorBox';
import ClientLayout from '@/app/components/templates/Layout';

async function getPalette(id: string) {
  const res = await fetch(`http://localhost:3000/api/palettes/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch palette');
  }
  return res.json();
}

export default async function PalettePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const palette = await getPalette(id);


  

  return (
     <ClientLayout>

    
    <div className="w-full flex flex-col justify-center items-center gap-5 py-10 bg-white">

      <div className="max-w-3xl mx-auto text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">{palette.name}</h1>
      </div>

      <div className="size-80 flex flex-col rounded-2xl overflow-hidden border">
      {palette.colors.map((color: string, index: number) => (
          <ColorBox key={index} color={color}  boxSize={80}/>
        ))}
      </div>

      
      <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6">
        {palette.colors.map((color: string, index: number) => (
          <ColorBalls key={index} color={color}/>
        ))}
      </div>

    </div>
    </ClientLayout>
  );
}