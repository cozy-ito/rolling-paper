import clsx from "clsx";

import Card from "../Card/Card";

import styles from "./CardList.module.css";

const CardList = ({ cards = [], className, onCardClick, ...props }) => {
  return (
    <div className={clsx(styles.cardList, className)}>
      {cards.map((card) => (
        <Card
          key={card.id}
          className={clsx(
            styles.card,
            card.image ? styles.withImage : styles.background,
          )}
          id={card.id}
          type={card.type}
          image={card.image}
          profileImages={card.profileImages}
          message={card.message}
          title={card.title}
          badge={card.badge}
          prefix={card.prefix}
          content={card.content}
          onClick={() => onCardClick(card.id)}
          {...props}
        />
      ))}
    </div>
  );
};

export default CardList;
