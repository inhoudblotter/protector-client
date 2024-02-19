import { BasePage } from "../BasePage";
import styles from "./PersonalDataTerms.module.css";

export default function PersonalDataTerms() {
  return (
    <BasePage>
      <section class={styles.container}>
        <h1 class={styles.title}>Политика конфиденциальности</h1>
        <p class={styles.text}>
          Соблюдение Вашей конфиденциальности важно для нас. По&nbsp;этой
          причине, мы&nbsp;разработали Политику Конфиденциальности, которая
          описывает, как мы&nbsp;используем и&nbsp;храним Вашу информацию.
          Пожалуйста, ознакомьтесь с&nbsp;нашими правилами соблюдения
          конфиденциальности и&nbsp;сообщите нам, если у&nbsp;вас возникнут
          какие-либо вопросы.
        </p>
        <h2 class={styles.subTitle}>
          Сбор и&nbsp;использование персональной информации
        </h2>
        <p class={styles.text}>
          Под персональной информацией понимаются данные, которые могут быть
          использованы для идентификации определенного лица либо связи
          с&nbsp;ним. От&nbsp;вас может быть запрошено предоставление вашей
          персональной информации в&nbsp;любой момент, когда
          вы&nbsp;связываетесь с&nbsp;нами. Ниже приведены некоторые примеры
          типов персональной информации, которую мы&nbsp;можем собирать,
          и&nbsp;как мы&nbsp;можем использовать такую информацию.
          <br />
          Какую персональную информацию мы собираем:
        </p>
        <ul class={styles.list}>
          <li class={styles.item}>
            Когда вы&nbsp;оставляете заявку на&nbsp;сайте, мы&nbsp;можем
            собирать различную информацию, включая ваши имя, номер телефона,
            адрес электронной почты и&nbsp;т.д.
          </li>
        </ul>
        <p class={styles.text}>
          Как мы&nbsp;используем вашу персональную информацию:
        </p>
        <ul class={styles.list}>
          <li class={styles.item}>
            Собираемая нами персональная информация позволяет нам связываться
            с&nbsp;вами и&nbsp;сообщать об&nbsp;уникальных предложениях, акциях
            и&nbsp;других мероприятиях и&nbsp;ближайших событиях.
          </li>
          <li class={styles.item}>
            Время от&nbsp;времени, мы&nbsp;можем использовать вашу персональную
            информацию для отправки важных уведомлений и&nbsp;сообщений.
          </li>
          <li class={styles.item}>
            Мы&nbsp;также можем использовать персональную информацию для
            внутренних целей, таких как проведения аудита, анализа данных
            и&nbsp;различных исследований в&nbsp;целях улучшения услуг
            предоставляемых нами и&nbsp;предоставления Вам рекомендаций
            относительно наших услуг.
          </li>
          <li class={styles.item}>
            Если вы&nbsp;принимаете участие в&nbsp;розыгрыше призов, конкурсе
            или сходном стимулирующем мероприятии, мы&nbsp;можем использовать
            предоставляемую вами информацию для управления такими программами.
          </li>
        </ul>
        <h2 class={styles.subTitle}>Раскрытие информации третьим лицам</h2>
        <p class={styles.text}>
          Мы&nbsp;не&nbsp;раскрываем полученную от&nbsp;Вас информацию третьим
          лицам.
          <br />
          Исключения:
        </p>
        <ul class={styles.list}>
          <li class={styles.item}>
            В&nbsp;случае если необходимо&nbsp;&mdash; в&nbsp;соответствии
            с&nbsp;законом, судебным порядком, в&nbsp;судебном разбирательстве,
            и/или на&nbsp;основании публичных запросов или запросов
            от&nbsp;государственных органов на&nbsp;территории РФ&nbsp;&mdash;
            раскрыть вашу персональную информацию. Мы&nbsp;также можем
            раскрывать информацию о&nbsp;вас если мы&nbsp;определим, что такое
            раскрытие необходимо или уместно в&nbsp;целях безопасности,
            поддержания правопорядка, или иных общественно важных случаях.
          </li>
          <li class={styles.item}>
            В случае реорганизации, слияния или продажи мы можем передать
            собираемую нами персональную информацию соответствующему третьему
            лицу – правопреемнику.
          </li>
        </ul>
        <h2 class={styles.subTitle}>Защита персональной информации</h2>
        <p class={styles.text}>
          Мы&nbsp;предпринимаем меры предосторожности&nbsp;&mdash; включая
          административные, технические и&nbsp;физические&nbsp;&mdash; для
          защиты вашей персональной информации от&nbsp;утраты, кражи,
          и&nbsp;недобросовестного использования, а&nbsp;также
          от&nbsp;несанкционированного доступа и раскрытия.
        </p>
        <h2 class={styles.subTitle}>
          Соблюдение вашей конфиденциальности на&nbsp;уровне компании
        </h2>
        <p class={styles.text}>
          Для того чтобы убедиться, что ваша персональная информация находится
          в&nbsp;безопасности, мы&nbsp;доводим нормы соблюдения
          конфиденциальности и&nbsp;безопасности до&nbsp;наших сотрудников,
          и&nbsp;строго следим за&nbsp;исполнением мер соблюдения
          конфиденциальности.
        </p>
      </section>
    </BasePage>
  );
}
