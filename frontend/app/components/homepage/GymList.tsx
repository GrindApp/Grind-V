import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

interface Gym {
  id: string;
  name: string;
  distance: string;
  image: any;
  tags: string;
}

const mockGyms: Gym[] = Array.from({ length: 20 }, (_, i) => ({
  id: `${i + 1}`,
  name: `Gym ${i + 1}`,
  distance: `${Math.floor(Math.random() * 1000)} meters away`,
  image: { uri: `https://source.unsplash.com/1600x900/?gym,fitness,${i + 1}` },
  tags: 'Yoga, Zumba, Weight Training +2 more',
}));

const PAGE_SIZE = 6;

const GymList = () => {
  const [gyms, setGyms] = useState<Gym[]>([]);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchGyms = (pageNumber: number) => {
    const start = (pageNumber - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const newGyms = mockGyms.slice(start, end);

    if (newGyms.length === 0) {
      setHasMore(false);
      return;
    }

    setGyms((prev) => [...prev, ...newGyms]);
  };

  useEffect(() => {
    fetchGyms(page);
  }, [page]);

  const loadMore = () => {
    if (!loadingMore && hasMore) {
      setLoadingMore(true);
      setTimeout(() => {
        setPage((prev) => prev + 1);
        setLoadingMore(false);
      }, 1000); // Simulate network delay
    }
  };

  const renderGym = ({ item }: { item: Gym }) => (
    <TouchableOpacity className="mb-4 bg-[#2C2C2E] rounded-xl overflow-hidden mx-4">
      <Image source={item.image} className="h-36 w-full" resizeMode="cover" />
      <View className="p-3">
        <Text className="text-white text-base font-semibold">{item.name}</Text>
        <Text className="text-gray-400 text-sm mt-1">{item.distance}</Text>
        <Text className="text-gray-400 text-sm mt-1">{item.tags}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="mb-10">
      <Text className="text-white text-lg font-semibold px-4 mb-2">All Gyms</Text>
      <FlatList
        data={gyms}
        keyExtractor={(item) => item.id}
        renderItem={renderGym}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loadingMore ? (
            <View className="py-4">
              <ActivityIndicator size="small" color="#fff" />
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default GymList;

