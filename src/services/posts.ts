const MOCK_POSTS = [
  {
    postId: "f1592f0b-5847-46d1-a6b5-02048a87db5e",
    postType: "IMAGE",
    postStatus: "COMPLETED",
    text: "Jack Tempchin: Waiting (with Mrs. Henry)",
    image: {
      url480p:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
    },
  },
  {
    postId: "7bf75573-5a11-4d4c-8ce4-06a80ddb981e",
    postType: "IMAGE",
    postStatus: "COMPLETED",
    text: null,
    image: {
      url480p:
        "https://media.architecturaldigest.com/photos/5af4aed7da68792ef45e50a4/master/w_3865,h_2576,c_limit/16%20Nacpan.jpg",
    },
  },
  {
    postId: "d5cafa4a-e9a4-4c84-a1f0-c7219b801e16",
    postType: "IMAGE",
    postStatus: "COMPLETED",
    text: null,
    image: {
      url480p:
        "https://www.ocean-beach.co.uk/wp-content/uploads/2021/09/INS_2758-995x524.jpg",
    },
  },
  {
    postId: "2a40f0f1-48f5-4271-9bd7-9a64b115fa9b",
    postType: "MUSIC",
    postStatus: "COMPLETED",
    text: "New Song! Never released ",
    image: {
      url480p:
        "https://images.theconversation.com/files/370685/original/file-20201123-13-x1rq79.jpg?ixlib=rb-1.1.0&rect=8%2C0%2C5422%2C3628&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip",
    },
  },
  {
    postId: "863ca205-e1f1-4f90-a296-d483ea3ebce1",
    postType: "IMAGE",
    postStatus: "COMPLETED",
    text: null,
    image: {
      url480p:
        "http://cdn.cnn.com/cnnnext/dam/assets/181010131059-australia-best-beaches-cossies-beach-cocos3.jpg",
    },
  },
  {
    postId: "53e4dd6b-1c0b-4f3e-8329-df2ea5ba661b",
    postType: "IMAGE",
    postStatus: "COMPLETED",
    text: "RIAA Certification",
    image: {
      url480p:
        "https://ssl.tzoo-img.com/images/blog/legacyblog/us/wp-content/uploads/2018/02/1_BoracayIsland_WhiteBeach_Philippines_shutterstock_401484094.jpg?width=412&spr=3",
    },
  },
  {
    postId: "015b88a3-e1c0-4a2b-8a59-7325e250281b",
    postType: "IMAGE",
    postStatus: "COMPLETED",
    text: "Jack and the Funky Kings! ",
    image: {
      url480p:
        "https://i.insider.com/5bfec49248eb12058423acf7?width=700",
    },
  },
  {
    postId: "8b689258-95ee-40e3-8a1a-4e0fadaa1b40",
    postType: "IMAGE",
    postStatus: "COMPLETED",
    text: "Jack peacefully asleep. Circa 1978 ",
    image: {
      url480p:
        "http://trekbaron.com/wp-content/uploads/2020/06/types-of-beaches-June302020-1-min.jpg",
    },
  },
];

export const postsService = {
  getAll: () => MOCK_POSTS,
};
