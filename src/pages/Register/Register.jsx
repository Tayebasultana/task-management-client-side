import { useContext, useState } from "react";
import { authContext } from "../../AuthProvider/AuthProvider";
import { NavLink, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { updateProfile } from "firebase/auth";
import { imageUpload } from "../../api/utils";
import toast from "react-hot-toast";



const Register = () => {
  const [error, setError] = useState('');
  const { handleRegister } = useContext(authContext);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  

const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const form = e.target;
    const name = form.name.value;
    const image = form.image.files[0];
    const email = form.email.value;
    const password = form.password.value;

    try {
        // Image upload if there's an image
        let imageURL = null;
        if (image) {
            imageURL = await imageUpload(image);
        }

        // Password validation
        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }
        if (!/[a-z]/.test(password)) {
            setError("At least one lowercase letter is required");
            return;
        }
        if (!/[A-Z]/.test(password)) {
            setError("At least one uppercase letter is required");
            return;
        }

        // Handle registration
        handleRegister(email, password)
            .then(res => {
                const loggedUser = res.user;
                console.log(loggedUser);

                // Set displayName and photoURL for the user
                if (imageURL) {
                    updateProfile(loggedUser, {
                        displayName: name,
                        photoURL: imageURL
                    }).then(() => {
                        console.log("User profile updated");
                    }).catch((error) => {
                        console.error("Error updating profile", error);
                    });
                }

                // Create user entry in the database
                const userInfo = { name, email};
                axiosPublic.post('/users', userInfo)
  .then(res => {
    console.log(res.data);  // Log the response to see if insertId is returned
    if (res.data.insertedId) {
      console.log("User added successfully");
      toast.success('Successfully registered!');
    }
  })
  .catch(error => {
    setError("Error adding user to database");
    console.error(error);
  });

            })
            .catch(err => {
                setError(err.message);
                console.error(err);
            });
    } catch (err) {
        setError("Error uploading image");
        console.error(err);
    }
};


  return (
      <div
          className="min-h-screen flex items-center justify-center"
        //   style={{
        //       backgroundImage: `url(${backgroundImg})`,
        //       backgroundSize: "cover",
        //       backgroundRepeat: "no-repeat",
        //       backgroundPosition: "center",
        //   }}
      >
          <div className="bg-white/90 p-8 md:p-12 rounded-lg shadow-lg max-w-4xl flex flex-col lg:flex-row gap-8 items-center">
              <div className="w-full">
                  <form onSubmit={handleSubmit}>
                      <div className="max-w-md space-y-4 mb-2 mx-auto">
                          <h2 className="text-center text-3xl font-bold text-yellow-500">Register</h2>
                          <label className="input input-bordered flex items-center gap-2">
                              <input type="text" name="name" className="grow" placeholder="Username" required />
                          </label>
                          <label className="input input-bordered flex items-center gap-2">
                              <input type="file" name="image" className="grow" placeholder="Image" accept="image/*" />
                          </label>
                          <label className="input input-bordered flex items-center gap-2">
                              <input type="text" name="email" className="grow" placeholder="Email" required />
                          </label>
                          <label className="input input-bordered flex items-center gap-2">
                              <input type="password" name="password" className="grow" placeholder="Password" required />
                          </label>
                          <button type="submit" className="btn w-full text-black text-bold text-lg bg-yellow-500">Register</button>
                      </div>
                  </form>
                  <span className="text-black">Already have an account? </span>
                  <NavLink to="/login" className="text-base text-yellow-500 font-bold">Login</NavLink>
                  {error && <p className="mt-2 text-red-500">{error}</p>}
              </div>
          </div>
      </div>
  );
};

export default Register;
