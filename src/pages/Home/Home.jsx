import React, { useEffect, useState, require } from 'react'
import axios from "axios";
import { FaBars } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaChartBar } from "react-icons/fa";
import { FaCog } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from 'react-router-dom';


function Home() {
    const navigate = useNavigate()

    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);
    const [activeTab, setActiveTab] = useState("gallery");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenPost, setIsModalOpenPost] = useState(false);

    const [galleryData, setGalleryData] = useState([])
    const [imageFile, setImageFile] = useState("")

    const [postDesc, setPostDesc] = useState("")
    const [postTitle, setPostTitle] = useState("")
    const [photoPath, setPhotoPath] = useState("")

    const [upload, setUpload] = useState(null)
    const [postId, setPostId] = useState(null)
    const [uploadPost, setUploadPost] = useState(false)


    function getImages(params) {
        const requestOptions = {
            method: "GET",
            redirect: "follow",
        };
        let url;
        if (activeTab === "gallery") {
            url = "http://26.207.100.35:9090/images"

        } else if (activeTab === "post") {
            url = "http://26.207.100.35:9090/post"

        }
        fetch(url, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
                setGalleryData(result)
            })
            .catch((error) => console.error(error));
    }
    async function deleteImages(id) {
        const requestOptions = {
            method: "DELETE",
            redirect: "follow",
            headers: {
                "Content-Type": "application/json", // Add this if the server expects JSON
            },
        };

        let url;
        if (activeTab === "gallery") {
            url = `http://26.207.100.35:9090/images/delete/${id}`

        } else if (activeTab === "post") {

            url = `http://26.207.100.35:9090/post/delete/${id}`

        }

        fetch(url, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
                setUpload(result)
            })
            .catch((error) => setUpload(error));
    }
    const postImage = async () => {
        const formdata = new FormData();
        formdata.append("file", imageFile);

        const requestOptions = {
            method: "POST",
            header: {
                "Content-Type": "multipart/form-data"
            },
            body: formdata,
            redirect: "follow"
        };

        let url;
        if (activeTab === "gallery") {
            url = "http://26.207.100.35:9090/images/upload"

        } else if (activeTab === "post") {
            url = `http://26.207.100.35:9090/post/image/upload`

        }

        fetch(url, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                if (activeTab === "post") {
                    setPhotoPath(result.photoPath)
                } else {
                    setUpload(result)

                }
            })
            .catch((error) => console.error(error));
    };
    async function addPost(params) {

        // Create FormData
        const formData = new FormData();
        formData.append("title", postTitle);
        formData.append("description", postDesc);
        formData.append("photoPath", photoPath); // Append the file

        try {
            const response = await axios.post(
                "http://26.207.100.35:9090/post/create", // API endpoint
                formData, // FormData payload
                {
                    headers: {
                        "Content-Type": "application/json", // Let Axios set this automatically
                    },
                }
            );
            setUpload(response.data)
            console.log("Post created successfully:", response.data);
            alert("Post added successfully!");
        } catch (error) {
            console.error(
                "Error creating the post:",
                error.response?.data || error.message
            );
            alert("Failed to add post. Check console for details.");
        }
    }

    async function updatePost(params) {
        const formData = new FormData();

        if (!imageFile) {
            alert("Please select an image file.");
            return;
        }

        // Append fields to the form data
        formData.append("title", postTitle);
        formData.append("description", postDesc);
        formData.append("photoPath", photoPath); // Ensure `imageFile` is a File object

        if (postId) {
            try {
                const response = await axios.put(
                    `http://26.207.100.35:9090/post/update/${postId}`, // API endpoint
                    formData, // FormData payload
                    {
                        headers: {
                            "Content-Type": "application/json", // Optional, Axios can set this automatically multipart/form-data application/json
                        },
                    }
                );
                setUpload(response.data)

                console.log("Update successful:", response.data);
            } catch (error) {
                if (error.response) {
                    console.error("Error status:", error.response.status);
                    console.error("Error message:", error.response.data);
                } else {
                    console.error("Error:", error.message);
                }
            }
        }

    }

    useEffect(() => {
        getImages()
        console.log(imageFile);

    }, [upload, activeTab])
    return (
        <div className="relative h-screen flex">
            {/* Sidebar */}
            <div className={`fixed  top-0 left-0 h-full bg-gray-800 text-white flex flex-col transition-all duration-300 z-50 ${isMobileMenuVisible ? "translate-x-0" : "-translate-x-full"
                } lg:translate-x-0 ${isCollapsed ? "w-20" : "w-64"}`}>
                <div className="flex items-center justify-between py-4 px-6 bg-gray-900">
                    <span className={`${isCollapsed ? "hidden" : "block"} text-2xl font-bold`}>Admin Panel</span>
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="text-gray-300 hover:text-white focus:outline-none hidden lg:block"
                    >
                        <FaBars />
                    </button>
                </div>

                <nav className="flex-grow">
                    <ul className="space-y-2 mt-4 bg-gray-600">
                        <li>
                            <a
                                href="#"
                                className="flex items-center px-6 py-3 text-white  hover:text-white rounded-lg transition"
                            >
                                <FaHome className="text-xl" />
                                <span className={`${isCollapsed ? "hidden" : "ml-3"}`}>Dashboard</span>
                            </a>
                        </li>

                    </ul>
                </nav>

                <div className="px-6 py-4">
                    <a
                        href="#"
                        className="flex items-center px-4 py-2 text-red-400 hover:bg-red-600 hover:text-white rounded-lg transition"
                    >
                        <FaSignOutAlt className="text-xl" />
                        <span onClick={(()=>{
                            navigate("/")
                        })} className={`${isCollapsed ? "hidden" : "ml-3"}`}>Logout</span>
                    </a>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col lg:ml-64">
                {/* Main Navigation */}
                <div className="flex justify-between items-center p-4 bg-gray-100 border-b">
                    {/* Menu Button (Visible on Mobile) */}
                    <button
                        onClick={() => setIsMobileMenuVisible(!isMobileMenuVisible)}
                        className="text-gray-700 hover:text-gray-900 focus:outline-none lg:hidden"
                    >
                        <FaBars className="text-2xl" />
                    </button>
                    <div className="flex space-x-4">
                        <button
                            onClick={() => setActiveTab("gallery")}
                            className={`px-4 py-2 rounded-lg ${activeTab === "gallery"
                                ? "bg-blue-500 text-white"
                                : "bg-white text-gray-700 border"
                                }`}
                        >
                            Gallery
                        </button>
                        <button
                            onClick={() => setActiveTab("post")}
                            className={`px-4 py-2 rounded-lg ${activeTab === "post"
                                ? "bg-blue-500 text-white"
                                : "bg-white text-gray-700 border"
                                }`}
                        >
                            Post
                        </button>
                    </div>
                </div>

                {/* Main Section */}
                {activeTab === "gallery" && (
                    <div className="mt-6 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {galleryData.map((item, i) => (
                            <div key={i} className="relative group border rounded-lg overflow-hidden">
                                <img
                                    src={item.path}
                                    alt={`Image ${i + 1}`}
                                    className="w-full md:h-32 h-64 object-cover"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition">
                                    <button onClick={(() => {
                                        deleteImages(item.id)
                                    })} className="px-4 py-2 bg-red-500 text-white rounded-lg">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="p-4 flex-grow overflow-y-auto">


                    {activeTab === "post" && (
                        <div class="bg-gray-100 p-4 flex flex-wrap gap-2 justify-center">

                            {activeTab === "post" ? galleryData.map((item) => {
                                return (<div class="bg-white border rounded-sm max-w-md">
                                    <div class="flex items-center px-4 py-3 relative">
                                        <div class="ml-3 ">
                                            <span class="text-sm font-semibold antialiased block leading-tight">{item.title}</span>
                                            <span class="text-gray-600 text-xs block">{item.description}</span>
                                            <span className='absolute top-3 text-red-600 right-2 text-lg cursor-pointer' onClick={(() => {
                                                setActiveTab("post")
                                                // setIsModalOpen(true)
                                                setPostId(item.id)
                                                deleteImages(item.id)
                                            })}><MdDeleteForever /></span>
                                            <span className='absolute top-3 text-green-600 right-10 text-base cursor-pointer' onClick={(() => {
                                                setActiveTab("post")
                                                setIsModalOpen(true)
                                                setPostId(item.id)
                                            })}><GoPencil /></span>
                                        </div>
                                    </div>
                                    <img src={item.photoPath} />

                                </div>)
                            }) : <>Salom</>}
                        </div>
                    )}
                </div>

                {/* Absolute Button */}
                {activeTab === "post" ? <button
                    onClick={() => {
                        setIsModalOpenPost(true)

                    }}
                    className="fixed bottom-6 xl:left-[300px] left-6 lg:left-[300px] bg-blue-500 text-white px-4 py-2 xl:text-2xl rounded-full shadow-lg hover:bg-blue-600 focus:outline-none"
                >
                    +
                </button> : (
                    <button
                        onClick={() => {
                            setIsModalOpen(true)
                        }}
                        className="fixed bottom-6 right-6 bg-blue-500 text-white px-4 py-2 xl:text-2xl rounded-full shadow-lg hover:bg-blue-600 focus:outline-none"
                    >
                        +
                    </button>
                )}

                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        {activeTab === "gallery" && (<div className="bg-white p-6 rounded-lg shadow-lg w-96">
                            <h2 className="text-xl font-bold mb-4">Modal Title</h2>
                            <input
                                onChange={((e) => {
                                    setImageFile(e.target.files[0])
                                    console.log(imageFile);

                                })}
                                type="file"
                                placeholder="Enter something..."
                                className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none"
                            />
                            <div className="flex justify-end space-x-2">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={(() => {
                                        postImage()
                                        setIsModalOpen(!isModalOpen)
                                    })}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                >
                                    Save
                                </button>
                            </div>
                        </div>)}
                        {activeTab === "post" && (<div className="bg-white p-6 rounded-lg shadow-lg w-96">
                            <h2 className="text-xl font-bold mb-4">Modal Title</h2>
                            <input
                                onChange={((e) => {
                                    setImageFile(e.target.files[0])
                                    console.log(imageFile);

                                })}
                                type="file"
                                placeholder="Enter something..."
                                className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none"
                            />

                            <div className="flex justify-end space-x-2">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={(() => {
                                        postImage()
                                        setIsModalOpen(!isModalOpen)
                                        setActiveTab("updatePost")
                                        setIsModalOpen(true)
                                    })}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                >
                                    Save
                                </button>
                            </div>
                        </div>)}
                        {activeTab === "updatePost" && (<div className="bg-white p-6 rounded-lg shadow-lg w-96">
                            <h2 className="text-xl font-bold mb-4">Modal Title</h2>
                            <input
                                onChange={((e) => {
                                    setPostTitle(`${e.target.value}`)
                                    console.log(imageFile, postTitle);

                                })}
                                type="text"
                                placeholder="Enter title..."
                                className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none"
                            />
                            <input
                                onChange={((e) => {
                                    setPostDesc(`${e.target.value}`)
                                    console.log(imageFile, postDesc);

                                })}
                                type="text"
                                placeholder="Enter description..."
                                className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none"
                            />
                            <div className="flex justify-end space-x-2">
                                <button
                                    onClick={() => {
                                        setIsModalOpen(false)
                                        setActiveTab("post")
                                    }
                                    }
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={(() => {
                                        updatePost()
                                        // postImage()
                                        setIsModalOpen(!isModalOpen)
                                        setActiveTab("post")
                                    })}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                >
                                    Save
                                </button>
                            </div>
                        </div>)}
                    </div>
                )}
                {isModalOpenPost && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        {!uploadPost && (<div className="bg-white p-6 rounded-lg shadow-lg w-96">
                            <h2 className="text-xl font-bold mb-4">Post Title</h2>
                            <input
                                onChange={((e) => {
                                    setImageFile(e.target.files[0])
                                    // console.log(imageFile);

                                })}
                                type="file"
                                placeholder="Enter something..."
                                className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none"
                            />
                            <div className="flex justify-end space-x-2">
                                <button
                                    onClick={() => setIsModalOpenPost(false)}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={(() => {
                                        setUploadPost(true)
                                        postImage()
                                    })}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                >
                                    Save
                                </button>
                            </div>
                        </div>)}
                        {uploadPost && (<div className="bg-white p-6 rounded-lg shadow-lg w-96">
                            <h2 className="text-xl font-bold mb-4">Modal Title</h2>
                            <input
                                onChange={((e) => {
                                    setPostTitle(`${e.target.value}`)
                                    // console.log(imageFile, postTitle);

                                })}
                                type="text"
                                placeholder="Enter title..."
                                className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none"
                            />
                            <input
                                onChange={((e) => {
                                    setPostDesc(`${e.target.value}`)
                                    // console.log(imageFile, postDesc);

                                })}
                                type="text"
                                placeholder="Enter description..."
                                className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none"
                            />
                            <div className="flex justify-end space-x-2">
                                <button
                                    onClick={() => {
                                        setIsModalOpenPost(false)
                                        setUploadPost(false)
                                        setActiveTab("post")
                                    }
                                    }
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={(() => {
                                        addPost()
                                        // postImage()
                                        setIsModalOpenPost(false)
                                        setUploadPost(false)

                                        setActiveTab("post")
                                    })}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                >
                                    Save
                                </button>
                            </div>
                        </div>)}
                    </div>
                )}

            </div>

            {/* Overlay for Mobile Menu */}
            {isMobileMenuVisible && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setIsMobileMenuVisible(false)}
                ></div>
            )}
        </div>
    );

}

export default Home