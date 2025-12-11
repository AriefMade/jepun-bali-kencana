interface TestimonialCardProps {
  name: string;
  message: string;
}

export default function TestimonialCard({ name, message }: TestimonialCardProps) {
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
        <div
          style={{
            width: 40,
            height: 25,
            background: "#67904E",
            borderRadius: "4px"
          }}
        ></div>

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

      <p
        style={{
          marginTop: 20,
          color: "#67646A",
          fontSize: 14,
          fontWeight: 500
        }}
      >
        {name}
      </p>
    </div>
  );
}
