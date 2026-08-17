import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Blog = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);
  useEffect(() => {
    AOS.init({
      duration: 1000, 
      once: true, 
    });
  }, []);

  const blogs = [
    {
      id: 1,
      title: "5 Simple Steps to Keep Your Teeth Healthy & White",
      category: "Dental Care",
      date: "May 10, 2026",
      desc: "Discover daily habits that prevent cavities and maintain a bright, natural smile.",
      fullContent:
        "Maintaining good oral health involves brushing twice a day with fluoride toothpaste, flossing daily, avoiding sugary snacks, using mouthwash, and visiting your dentist twice a year.",
      img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&w=500",
    },
    {
      id: 2,
      title: "Why Regular Dental Checkups Are Essential",
      category: "Health Tips",
      date: "Apr 28, 2026",
      desc: "Learn why visiting your dentist twice a year can save you from major oral problems.",
      fullContent:
        "Regular dental visits help detect early signs of cavities, gum disease, and oral health problems before they become painful and expensive to treat.",
      img: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&w=500",
    },
    {
      id: 3,
      title: "How to Choose the Right Toothbrush for Your Teeth",
      category: "Guide",
      date: "Apr 15, 2026",
      desc: "Soft vs. hard bristles—find out which toothbrush suits your sensitive gums best.",
      fullContent:
        "Dentists generally recommend soft-bristled toothbrushes because hard bristles can damage enamel and recede gums. Electric toothbrushes are also a great option.",
      img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&w=500",
    },
  ];

  return (
    <section className="py-5 bg-light" id="blog">
      <div className="container">
        
        <div className="text-center mb-5" data-aos="fade-up">
          <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2 mb-2 fw-semibold">
            Our Articles
          </span>
          <h2 className="fw-bold display-6">Latest News & Dental Tips</h2>
          <p className="text-muted">
            Stay informed with expert advice from our professional dentists.
          </p>
        </div>

        
        <div className="row g-4">
          {blogs.map((item) => (
            <div className="col-md-4" key={item.id} data-aos="fade-up">
              <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                <img
                  src={item.img}
                  className="card-img-top object-fit-cover"
                  alt={item.title}
                  style={{ height: "200px" }}
                />
                <div className="card-body p-4 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="badge bg-primary-subtle text-primary fw-semibold">
                      {item.category}
                    </span>
                    <small className="text-muted">{item.date}</small>
                  </div>
                  <h5 className="card-title fw-bold fs-6 mb-2">{item.title}</h5>
                  <p className="card-text text-muted small flex-grow-1">
                    {item.desc}
                  </p>

                  
                  <button
                    type="button"
                    className="btn btn-link text-primary p-0 fw-semibold text-decoration-none mt-2 text-start"
                    onClick={() => setSelectedBlog(item)}
                  >
                    Read More <i className="bi bi-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        
        {selectedBlog && (
          <div
            className="modal fade show d-block"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content rounded-4 border-0 p-3">
                <div className="modal-header border-0">
                  <h5 className="modal-title fw-bold">{selectedBlog.title}</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setSelectedBlog(null)}
                  ></button>
                </div>
                <div className="modal-body">
                  <span className="badge bg-primary mb-2">
                    {selectedBlog.category}
                  </span>
                  <p className="text-muted">{selectedBlog.fullContent}</p>
                </div>
                <div className="modal-footer border-0">
                  <button
                    type="button"
                    className="btn btn-secondary rounded-pill px-4"
                    onClick={() => setSelectedBlog(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
