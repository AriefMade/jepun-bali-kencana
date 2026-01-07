import { Star } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  message: string;
  rating: number;
}

export default function TestimonialCard({ name, message, rating }: TestimonialCardProps) {
  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        size={14} 
        fill={i < rating ? '#fbbf24' : 'none'}
        color={i < rating ? '#fbbf24' : '#d1d5db'}
        style={{ display: 'inline-block', marginRight: '2px' }}
      />
    ));
  };

  return (
    <div
      style={{
        background: "#F5F2ED",
        borderRadius: "12px",
        padding: "20px",
        minHeight: "180px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}
    >
      <div>
        <img className="quote" src={"/Vector.svg"}/>
        <p
          style={{
            marginTop: 15,
            color: "#413D45",
            fontSize: 16,
            fontWeight: 500,
            lineHeight: "22px"
          }}
        >
          {message}
        </p>
      </div>

      <div>
        <p
          style={{
            marginTop: 20,
            marginBottom: 6,
            color: "#67646A",
            fontSize: 14,
            fontWeight: 500
          }}
        >
          {name}
        </p>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {renderStars()}
        </div>
      </div>
    </div>
  );
}
