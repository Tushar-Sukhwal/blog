"use client";
import React, { useEffect, useState } from "react";

const OnThisPage = ({ htmlContent }) => {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;
    const h2Elements = tempDiv.querySelectorAll("h2");
    const h2Data = Array.from(h2Elements).map((h2) => ({
      text: h2.textContent,
      id: h2.id,
    }));
    setHeadings(h2Data);
  }, [htmlContent]);

  useEffect(() => {
    const headingElements = headings.map((h) => document.getElementById(h.id));
    let observer;

    const onIntersect = (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

      if (visible.length > 0) {
        setActiveId(visible[0].target.id);
      }
    };

    if (headingElements.length) {
      observer = new IntersectionObserver(onIntersect, {
        rootMargin: "0px 0px -60% 0px",
        threshold: 0.1,
      });

      headingElements.forEach((el) => {
        if (el) observer.observe(el);
      });
    }

    const handleScroll = () => {
      const buffer = 10; // pixels before bottom
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - buffer;

      if (isAtBottom && headings.length) {
        const lastHeadingId = headings[headings.length - 1].id;
        setActiveId(lastHeadingId);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      if (observer) {
        headingElements.forEach((el) => {
          if (el) observer.unobserve(el);
        });
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, [headings]);

  return (
    <div className="on-this-page fixed top-[12%]  px-auto  hidden lg:block">
      <h2 className="text-md font-bold my-2">On This Page</h2>
      <ul className="text-sm space-y-1">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={`
                relative block pl-4 py-1 transition-all duration-300
                ${
                  heading.id === activeId
                    ? "text-blue-600 font-semibold before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-blue-500 before:rounded transition-all"
                    : "text-gray-700"
                }
              `}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OnThisPage;
