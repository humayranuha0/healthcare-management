import React from "react";

const reviews = [
  {
    id: 1,
    name: "Sarah Rahman",
    role: "Dental Patient",
    comment:
      "The dental checkup experience was absolutely seamless. The doctors are highly professional and gentle!",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    id: 2,
    name: "Tanvir Ahmed",
    role: "Orthodontics Patient",
    comment:
      "Got my aligners fitted here. Amazing service, clean clinic, and the staff is super helpful!",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tanvir",
  },
  {
    id: 3,
    name: "Nusrat Jahan",
    role: "Teeth Whitening Patient",
    comment:
      "Very happy with the results! The pricing is fair and the environment is very relaxing.",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nusrat",
  },
];

const Patient = () => {
  return (
    <section className="py-5 bg-white">
      <div className="container py-lg-4">
        <div className="text-center mx-auto mb-5" style={{ maxWidth: "600px" }}>
          <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill fw-semibold mb-2">
            Testimonials
          </span>
          <h2 className="fw-bold text-dark display-6 mb-3">
            What Our Patients Say
          </h2>
          <p className="text-muted">
            Read real stories and experiences from the people who trusted us
            with their smiles.
          </p>
        </div>

        <div className="row g-4">
          {reviews.map((item) => (
            <div key={item.id} className="col-lg-4 col-md-6">
              <div className="card h-100 border-0 shadow-sm p-4 rounded-4 bg-light">
                <div className="text-warning mb-3">
                  {[...Array(item.rating)].map((_, i) => (
                    <i key={i} className="bi bi-star-fill me-1"></i>
                  ))}
                </div>

                <p className="text-secondary mb-4 italic">"{item.comment}"</p>

                <div className="d-flex align-items-center gap-3 mt-auto pt-3 border-top">
                  <div
                    className="rounded-circle overflow-hidden bg-white shadow-sm d-flex align-items-center justify-content-center"
                    style={{ width: "50px", height: "50px" }}
                  >
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-100 h-100 object-fit-cover"
                    />
                  </div>
                  <div>
                    <h6 className="fw-bold text-dark mb-0">{item.name}</h6>
                    <small className="text-muted">{item.role}</small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Patient;
