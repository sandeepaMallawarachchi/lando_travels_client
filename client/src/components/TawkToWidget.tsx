import { useEffect } from "react";

const TawkToWidget = () => {
  useEffect(() => {
    if (document.getElementById("tawk-script")) return;

    const script = document.createElement("script");
    script.id = "tawk-script";
    script.src = "https://embed.tawk.to/685929b56873051921d626de/1iue4ls6t";
    script.async = true;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    document.body.appendChild(script);

    return () => {
      const existing = document.getElementById("tawk-script");
      if (existing) existing.remove();
    };
  }, []);

  return null;
};

export default TawkToWidget;
