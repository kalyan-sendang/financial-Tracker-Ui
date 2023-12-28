function ProfilePage() {
  const profile = JSON.parse(localStorage.getItem("userprofile")) || [];

  return (
    <div>
      <section className="bg-light" />
      <div className="container">
        <div className="row">
          <div className="col-lg-12 mb-4 mb-sm-5">
            <div className="card card-style1 border-0">
              <div className="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7">
                <div className="row align-items-center">
                  <div className="col-lg-6 mb-4 mb-lg-0">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar7.png"
                      alt="..."
                    />
                  </div>
                  <div className="col-lg-6 px-xl-10">
                    <div
                      className="bg-primary d-block-inline-block  py-3 px-1-9 px-sm-6 mb-1-9 rounded"
                      style={{ width: "50%" }}
                    >
                      <h3
                        className="h2 text-white mb-0 ml-2"
                        style={{ marginLeft: "35%" }}
                      >
                        {profile?.userName}
                      </h3>
                    </div>
                    <ul className="list-unstyled mb-1-9">
                      <li className="mb-2 mb-xl-3 display-28 mt-3 ">
                        <span className="display-26 text-secondary me-2 font-weight-600">
                          UserId:
                        </span>{" "}
                        {profile?.userId}
                      </li>
                      <li className="mb-2 mb-xl-3 display-28">
                        <span className="display-26 text-secondary me-2 font-weight-600">
                          Email:
                        </span>{" "}
                        {profile?.email}
                      </li>
                      <li className="mb-2 mb-xl-3 display-28">
                        <span className="display-26 text-secondary me-2 font-weight-600">
                          Profession:
                        </span>{" "}
                        {profile?.role}
                      </li>
                      <li className="display-28">
                        <span className="display-26 text-secondary me-2 font-weight-600">
                          Status:
                        </span>{" "}
                        <select>
                          <option>active</option>
                          <option>Inactive</option>
                        </select>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
