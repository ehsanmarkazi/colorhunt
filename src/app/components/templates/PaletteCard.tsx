import ColorBox from "../modules/ColorBox";

interface PaletteCardProps {
  name: string;
  colors: string[];
}

const PaletteCard: React.FC<PaletteCardProps> = ({ name, colors }) => {
  return (
    <div className=" transition">
        <h3 className="text-center text-sm font-semibold mb-2">{name}</h3>
      <div className="w-60 h-60 flex flex-col rounded-2xl overflow-hidden border">
      {colors.map((color, index) => (
          <ColorBox key={index} color={color} boxSize={60} />
        ))}
      </div>
   

      
    </div>
  );
};

export default PaletteCard;
