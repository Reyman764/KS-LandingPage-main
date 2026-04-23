import './LogoBar.css';

const brands = [
  'Stripe',
  'Vercel',
  'Notion',
  'Linear',
  'Figma',
  'Slack',
  'GitHub',
  'Shopify',
];

export default function LogoBar() {
  return (
    <section className="logo-bar" id="logo-bar">
      <div className="container">
        <p className="logo-bar__label">
          Trusted by forward-thinking teams at
        </p>
        <div className="logo-bar__track">
          <div className="logo-bar__scroll">
            {[...brands, ...brands].map((brand, i) => (
              <span className="logo-bar__brand" key={i}>
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
