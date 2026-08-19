import { useMemo } from "react";

import { UserProfileProps } from "../types/userProfileProps";

import {

  BuyButton,

  Container,

  Cost,

  Description,

  Header,

  ItemName,

  ItemWrapper,

  LockedContainer,

} from "../styles";

import { achievements, items } from "../constants";

import BuySound from "../assets/sounds/buy.mp3";

import { formatNumber, playSound, showToast } from "../utils";

import { Tooltip } from "@mui/material";



export const Shop = ({ userProfile, setUserProfile }: UserProfileProps) => {

  const rateGrown = 1.213742069;

  const descriptionMaxLength = 169;

  const handleBuyItem = (item: string) => {

    playSound(BuySound, userProfile.audioVolume);

    const selectedItem = items[item];



    const itemCount = userProfile.inventory[item] || 0;

    const newCost = Math.floor(

      selectedItem.cost * Math.pow(rateGrown, itemCount)

    );

    const newPoints = userProfile.points - newCost;

    const newMultiplier = userProfile.multiplier + selectedItem.multiplier;

    const newPerSecond = userProfile.perSecond + selectedItem.perSecond;

    const newInventory = { ...userProfile.inventory };



    newInventory[item] = (newInventory[item] || 0) + 1;

    setUserProfile({

      ...userProfile,

      points: newPoints,

      multiplier: newMultiplier,

      perSecond: newPerSecond,

      inventory: newInventory,

    });

    const purchasedItemsSum = Object.values(userProfile.inventory).reduce(

      (a, b) => a + b,

      1

    );

    if (!userProfile.inventory[item]) {

      showToast({

        header: "Новый уют разблокирован!",

        text: `${selectedItem.name} ${selectedItem.emoji}`,

        emoji: "🔓",

        volume: userProfile.audioVolume,

      });

    }

    const unlockedPurchaseAchievements = Object.values(achievements).filter(

      (achievement) =>

        achievement.purchasesRequired !== undefined &&

        purchasedItemsSum >= achievement.purchasesRequired &&

        !userProfile.achievements.includes(achievement.name)

    );

    if (unlockedPurchaseAchievements.length > 0) {

      unlockedPurchaseAchievements.forEach((achievement) => {

        showToast({

          header: `Достижение разблокировано: ${achievement.name}`,

          text: achievement.description,

          emoji: achievement.emoji,

          volume: userProfile.audioVolume,

        });

      });



      const newAchievements = userProfile.newAchievements + 1;

      setUserProfile({

        ...userProfile,

        points: newPoints,

        multiplier: newMultiplier,

        perSecond: newPerSecond,

        inventory: newInventory,

        achievements: [

          ...userProfile.achievements,

          ...unlockedPurchaseAchievements.map(

            (achievement) => achievement.name

          ),

        ],

        newAchievements: newAchievements,

        dateAchievements: {

          ...userProfile.dateAchievements,

          [unlockedPurchaseAchievements[0].name]: new Date(),

        },

      });

    }

  };



  const numLockedItems = useMemo(() => {

    return Object.values(items).filter(

      (item) => item.cost > userProfile.maxPoints

    ).length;

  }, [userProfile.maxPoints]);

  const nextLockedItem = useMemo(

    () => Object.values(items).find((item) => item.cost > userProfile.maxPoints),

    [userProfile.maxPoints]

  );



  return (

    <div>

      <Header>🛒 Магазин уюта</Header>



      <Container>

        {Object.entries(items).map(([itemName, item]) => {

          if (item.cost > userProfile.maxPoints) {

            return null;

          }



          const itemCount = userProfile.inventory[itemName] || 0;

          const newCost = Math.floor(

            item.cost * Math.pow(rateGrown, itemCount)

          );



          return (

            <ItemWrapper key={itemName}>

              <ItemName>

                {item.emoji} {item.name}

              </ItemName>

              <Tooltip

                title={

                  item.description.length > descriptionMaxLength

                    ? `${item.description.substring(descriptionMaxLength)}`

                    : null

                }

              >

                <Description>

                  ”

                  {item.description.length > descriptionMaxLength

                    ? `${item.description.substring(

                        0,

                        descriptionMaxLength

                      )}...`

                    : item.description}

                  ”

                </Description>

              </Tooltip>

              <Cost enoughtPoints={userProfile.points >= newCost}>

                Цена: 🧀{formatNumber(newCost, 0)}

              </Cost>

              <p>Нажатий за раз: +{formatNumber(item.multiplier, 0)}</p>

              <p>В секунду: {formatNumber(item.perSecond, 1)}</p>

              <p>Куплено: {formatNumber(itemCount, 0)}</p>



              <BuyButton

                disabled={newCost > userProfile.points}

                onClick={() => {

                  handleBuyItem(itemName);

                }}

              >

                {newCost > userProfile.points ? "Недостаточно сыркоинов" : "Купить"}

              </BuyButton>

            </ItemWrapper>

          );

        })}

        {numLockedItems > 0 && (

          <LockedContainer>

            <h3>

              🔒 Следующий предмет откроется после {" "}

              {formatNumber(nextLockedItem?.cost ?? 0, 0)} сыркоинов

            </h3>

          </LockedContainer>

        )}

      </Container>



      <div style={{ paddingTop: "85px" }} />

    </div>

  );

}; 

