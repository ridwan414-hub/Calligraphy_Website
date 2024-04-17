import { useState } from 'react';

const Blogs = () => {
  const [expandedIndex, setExpandedIndex] = useState(-1);

  // Dummy data for blog posts
  const blogPosts = [
    {
      title:
        'A Journey Through Time: Exploring the Enduring Legacy of Calligraphy',
      image: '../../Images/b1.jpg',
      text: "In the delicate dance of history, the ink flows like a silent symphony across the canvas of time. From the ancient 刻字 (kèzì) of China's antiquity, where characters were etched onto bone, to the graceful flourishes of Islamic script adorning the walls of grand mosques, calligraphy has been the silent narrator of civilizations past. Each stroke, each curve, whispers tales of wisdom, culture, and tradition. It was the medieval scribes who wielded their quills like knights of enlightenment, meticulously crafting illuminated manuscripts that became beacons of knowledge in a dark age. And even as the relentless march of progress brought forth the printing press, calligraphy endured, its artistry unyielding to the mechanized efficiency of modernity. Today, in the digital age, where pixels dance on screens like fireflies in the night, calligraphy persists, a testament to humanity's unyielding desire to infuse the ordinary with the extraordinary. It is more than just writing; it is a timeless thread woven into the very fabric of civilization, a bridge that spans the chasm between the whispers of the past and the flourishing dreams of the future.",
    },
    {
      title:
        'The Art of Making Memories Permanent: Calligraphy for Special Occasions',
      image: '../../Images/b2.jpg',
      text: "From the joyous announcement of a wedding to the momentous achievement of a graduation, life's special occasions deserve a touch of timeless elegance. Calligraphy transcends the printed word, transforming simple invitations and certificates into cherished keepsakes. Each stroke tells a story, reflecting your unique style and the emotions of the occasion. Imagine the thrill of receiving a wedding invitation carefully hand-lettered with your names, or the pride of holding a graduation certificate adorned with intricate calligraphy. Calligraphy adds a personal touch that mass-produced invitations simply cannot match. Here's what calligraphy brings to your special occasions: Uniqueness: Each handwritten stroke is a testament to artistry, ensuring your invitations and certificates stand out from the ordinary. Timeless Beauty: Calligraphy transcends trends, offering a classic elegance that will be treasured for years to come. Emotional Connection: The care and detail evident in calligraphy convey a deeper sentiment, making the recipient feel truly valued. Customization: Choose from a variety of styles and fonts to perfectly reflect your personality and the occasion's theme. Beyond wedding invitations and certificates, calligraphy elevates various special occasions: Anniversary cards: Express your enduring love with a personalized, hand-lettered card. Birth announcements: Welcome your little one into the world with a beautifully inscribed announcement. Retirement gifts: Celebrate a well-deserved milestone with a personalized certificate or plaque adorned with calligraphy. Invest in lasting memories. Let calligraphy transform your special occasions into something truly unforgettable.",
    },
    {
      title: 'The Serenity of Calligraphy: A Meditation Practice',
      image: '../../Images/b3.jpg',
      text: "In our fast-paced world, finding moments of quiet focus can be a challenge. Calligraphy offers a unique opportunity to cultivate mindfulness and enter a state of peaceful meditation. Each deliberate stroke requires presence, guiding your mind to slow down and connect with the present moment. Imagine the gentle scrape of the pen against paper, the rhythmic flow of ink, and the mindful concentration on forming each letter perfectly. This practice helps quiet the mental chatter, promoting relaxation and inner peace. Beyond the calming effect, calligraphy fosters a deeper connection with the written word. It allows you to appreciate the beauty of language and the artistry behind each character. As you practice, you develop patience, discipline, and a sense of accomplishment. Calligraphy is more than just creating beautiful letters; it's a journey of self-discovery and mindful exploration.",
    },
  ];

  const toggleExpand = (index) => {
    setExpandedIndex(index === expandedIndex ? -1 : index);
  };

  return (
    <div className="container bg-[linear-gradient(330deg,_#ff6e7f,_#bfe9ff)] mx-auto py-8">
      <h1 className="text-4xl font-semibold text-center text-gray-800 mb-10 mt-0 italic">
        Latest Blog Posts
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <div
            key={index}
            className=" mb-10 rounded-lg shadow-md overflow-hidden bg-[linear-gradient(180deg,_#4AC29A,_#BDFFF3)]  transition duration-300 transform hover:scale-105"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-6 ">
              <h2 className="text-xl font-semibold font-styl text-gray-800 mb-2">
                {post.title}
              </h2>
              <p className="text-gray-600 mb-4 mt-5 text-[17px]">
                {expandedIndex === index
                  ? post.text
                  : post.text.substring(0, 200) + '...'}
              </p>
              <button
                onClick={() => toggleExpand(index)}
                className="text-red-700 hover:underline focus:outline-none"
              >
                {expandedIndex === index ? 'Read Less' : 'Read More'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
