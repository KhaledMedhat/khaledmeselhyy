/** A project screenshot set slightly back in 3D; it turns flat on hover. */
export function Shot({ image, alt }: { image: string; alt: string }) {
  return (
    <div className="shot-stage">
      <div className="shot">
        <img src={image} alt={alt} />
      </div>
    </div>
  );
}
