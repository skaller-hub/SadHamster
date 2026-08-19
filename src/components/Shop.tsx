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
import { items } from "../constants";
import { formatNumber } from "../utils";
import { Tooltip } from "@mui/material";
import { useBuyItem, RATE_GROWN } from "../hooks";

export const Shop = ({ userProfile, setUserProfile }: UserProfileProps) => {
  const rateGrown = RATE_GROWN;
  const descriptionMaxLength = 169;
  const { handleBuyItem } = useBuyItem({ userProfile, setUserProfile });

  const numLockedItems = useMemo(() => {
    return Object.values(items).filter(
      (item) => item.cost > userProfile.maxPoints,
    ).length;
  }, [userProfile.maxPoints]);

  const nextLockedItem = useMemo(
    () =>
      Object.values(items).find((item) => item.cost > userProfile.maxPoints),

    [userProfile.maxPoints],
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
            item.cost * Math.pow(rateGrown, itemCount),
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

                        descriptionMaxLength,
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
                {newCost > userProfile.points
                  ? "Недостаточно сыркоинов"
                  : "Купить"}
              </BuyButton>
            </ItemWrapper>
          );
        })}

        {numLockedItems > 0 && (
          <LockedContainer>
            <h3>
              🔒 Следующий предмет откроется после{" "}
              {formatNumber(nextLockedItem?.cost ?? 0, 0)} сыркоинов
            </h3>
          </LockedContainer>
        )}
      </Container>

      <div style={{ paddingTop: "85px" }} />
    </div>
  );
};
