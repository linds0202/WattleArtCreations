interface Img {
    src: string, 
    alt: string
}

const HeroImage = ({ src, alt }: Img, type = "image/png") => {
  
  return (
      <picture>
        <source srcSet={src} type={type} />
        <img src={src} alt={alt} />
      </picture>
    );
  };
  
  export default HeroImage;