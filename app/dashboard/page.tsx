// "use client";

// import { useEffect, useState } from "react";
// import { supabase } from "@/lib/supabaseClient";
// import { useRouter } from "next/navigation";

// type Bookmark = {
//   id: string;
//   title: string;
//   url: string;
// };

// export default function Dashboard() {
//   const router = useRouter();
//   const [user, setUser] = useState<any>(null);
//   const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
//   const [title, setTitle] = useState("");
//   const [url, setUrl] = useState("");

//   // ✅ Check login
//   useEffect(() => {
//     const checkUser = async () => {
//       const { data } = await supabase.auth.getUser();
//       if (!data.user) {
//         router.push("/");
//       } else {
//         setUser(data.user);
//         fetchBookmarks(data.user.id);
//       }
//     };
//     checkUser();
//   }, []);

//  const fetchBookmarks = async (userId: string) => {
//   const { data, error } = await supabase
//     .from("bookmarks")
//     .select("*")
//     .eq("user_id", userId)
//     .order("created_at", { ascending: false });

//   if (error) {
//     console.log("Fetch error:", error);
//   } else {
//     setBookmarks(data || []);
//   }
// };


//   // ✅ Add bookmark
//   const addBookmark = async () => {
//     if (!title || !url) return;

//     await supabase.from("bookmarks").insert({
//       title,
//       url,
//       user_id: user.id,
//     });

//     setTitle("");
//     setUrl("");
//   };

//   // ✅ Delete bookmark
//   const deleteBookmark = async (id: string) => {
//     await supabase.from("bookmarks").delete().eq("id", id);
//   };

//   // ✅ REALTIME SUBSCRIPTION
//   useEffect(() => {
//     const channel = supabase
//       .channel("realtime-bookmarks")
//       .on(
//         "postgres_changes",
//         { event: "*", schema: "public", table: "bookmarks" },
//         () => fetchBookmarks(user?.id)
//       )
//       .subscribe();

//     return () => {
//       supabase.removeChannel(channel);
//     };
//   }, [user]);

//   // ✅ Logout
//   const logout = async () => {
//     await supabase.auth.signOut();
//     router.push("/");
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6">
//       <div className="flex justify-between mb-6">
//         <h1 className="text-2xl font-bold">My Bookmarks</h1>
//         <button
//           onClick={logout}
//           className="bg-red-500 text-white px-3 py-1 rounded"
//         >
//           Logout
//         </button>
//       </div>

//       {/* Add Bookmark */}
//       <div className="mb-6 space-y-3">
//         <input
//           className="border w-full p-2"
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <input
//           className="border w-full p-2"
//           placeholder="URL"
//           value={url}
//           onChange={(e) => setUrl(e.target.value)}
//         />
//         <button
//           onClick={addBookmark}
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Add Bookmark
//         </button>
//       </div>

//       {/* Bookmark List */}
//       <div className="space-y-3">
//         {bookmarks.map((b) => (
//           <div
//             key={b.id}
//             className="border p-3 flex justify-between items-center"
//           >
//             <div>
//               <p className="font-semibold">{b.title}</p>
//               <a href={b.url} className="text-blue-600" target="_blank">
//                 {b.url}
//               </a>
//             </div>

//             <button
//               onClick={() => deleteBookmark(b.id)}
//               className="bg-red-400 text-white px-2 py-1 rounded"
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

type Bookmark = {
    id: string;
    title: string;
    url: string;
};

export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(true);

    // ✅ Check login
    useEffect(() => {
        const checkUser = async () => {
            const { data } = await supabase.auth.getUser();
            if (!data.user) {
                router.push("/");
            } else {
                setUser(data.user);
                fetchBookmarks(data.user.id);
            }
        };
        checkUser();
    }, []);

    // ✅ Fetch bookmarks
    const fetchBookmarks = async (userId: string) => {
        setLoading(true);

        const { data, error } = await supabase
            .from("bookmarks")
            .select("*")
            .eq("user_id", userId)
            .order("created_at", { ascending: false });

        if (!error) setBookmarks(data || []);

        setLoading(false);
    };

    // ✅ Add bookmark
    const addBookmark = async () => {
        if (!title || !url) {
            alert("Please fill both fields");
            return;
        }

        await supabase.from("bookmarks").insert({
            title,
            url,
            user_id: user.id,
        });

        setTitle("");
        setUrl("");

        fetchBookmarks(user.id); // ⭐ instant update
    };

    // ✅ Delete bookmark
    const deleteBookmark = async (id: string) => {
        await supabase.from("bookmarks").delete().eq("id", id);

        fetchBookmarks(user.id); // ⭐ instant update
    };

    // ✅ Realtime updates
    useEffect(() => {
        if (!user) return;

        const channel = supabase
            .channel("realtime-bookmarks")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "bookmarks" },
                () => fetchBookmarks(user.id)
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [user]);

    // ✅ Logout
    const logout = async () => {
        await supabase.auth.signOut();
        router.push("/");
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        🔖 My Bookmarks
                    </h1>

                    <button
                        onClick={logout}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                    >
                        Logout
                    </button>
                </div>

                {/* Add Bookmark Card */}
                <div className="bg-white p-6 rounded-xl shadow-md mb-8">
                    <h2 className="text-lg font-semibold mb-4">Add New Bookmark</h2>

                    <div className="space-y-4">
                        <input
                            className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-400 outline-none"
                            placeholder="Bookmark Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <input
                            className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-400 outline-none"
                            placeholder="https://example.com"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />


                        <button
                            onClick={addBookmark}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition"
                        >
                            ➕ Add Bookmark
                        </button>
                    </div>
                </div>

                {/* Bookmarks List */}
                {loading ? (
                    <p className="text-center text-gray-500">Loading bookmarks...</p>
                ) : bookmarks.length === 0 ? (
                    <p className="text-center text-gray-500">
                        No bookmarks yet. Add your first one 🚀
                    </p>
                ) : (
                    <div className="space-y-4">
                        {bookmarks.map((b) => (
                            <div
                                key={b.id}
                                className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition flex justify-between items-center"
                            >
                                <div>
                                    <p className="font-semibold text-lg">{b.title}</p>
                                    <a
                                        href={b.url}
                                        target="_blank"
                                        className="text-blue-600 hover:underline text-sm"
                                    >
                                        {b.url}
                                    </a>
                                </div>

                                <button
                                    onClick={() => deleteBookmark(b.id)}
                                    className="bg-red-400 hover:bg-red-500 text-white px-3 py-2 rounded-lg transition"
                                >
                                    🗑 Delete
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
