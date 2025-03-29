
import { FormData } from '../../types';
import { ensureNumber } from '../../utils/typeConversions';

export const useRoomsSubmissions = () => {
  // Function to handle bathroom details submission
  const handleBathroomDetailsSubmit = (data: any) => {
    return {
      bathroomType: data.bathroomType,
      bathroomCount: ensureNumber(data.bathroomCount),
      bathroomBudget: ensureNumber(data.bathroomBudget),
    };
  };

  // Function to handle kitchen details submission
  const handleKitchenDetailsSubmit = (data: any) => {
    return {
      kitchenType: data.kitchenType,
      kitchenBudget: ensureNumber(data.kitchenBudget),
    };
  };

  // Function to handle living room details submission
  const handleLivingRoomDetailsSubmit = (data: any) => {
    return {
      livingRoomSize: ensureNumber(data.livingRoomSize),
      livingRoomStyle: data.livingRoomStyle,
    };
  };

  return {
    handleBathroomDetailsSubmit,
    handleKitchenDetailsSubmit,
    handleLivingRoomDetailsSubmit,
  };
};
