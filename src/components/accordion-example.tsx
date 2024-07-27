import {
  Accordion,
  AccordionContet,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accodrion";
import Title from "./title";

const AccordionExample = () => {
  const data = [
    {
      id: 0,
      variant: "primary",
    },
    {
      id: 1,
      variant: "info",
    },
    {
      id: 2,
      variant: "warning",
    },
    {
      id: 3,
      variant: "danger",
    },
    {
      id: 4,
      variant: "success",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-5">
      <Title title="multi accordion">
        <Accordion>
          {data.map((d) => {
            return (
              <AccordionItem value={d.id} variant={d.variant as any}>
                <AccordionTrigger>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
                  cum enim libero repudiandae atque necessitatibus sunt eum
                  quibusdam reiciendis. Officiis.
                </AccordionTrigger>
                <AccordionContet>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Expedita perspiciatis illo nesciunt eaque esse molestias
                  repellat earum, cum cumque facilis numquam est, quisquam
                  atque, corrupti quas doloribus voluptates inventore ullam.
                  Quaerat dolorem, quae ex voluptate doloribus dolores ut
                  voluptas repellat, veniam perferendis corporis magnam vel eius
                  sequi illo! Et fugit quisquam voluptatibus corporis quis eos
                  nam tempore enim recusandae tenetur officiis ab, dolorem
                  doloremque quo minima consequuntur! Sit explicabo id vel
                  voluptatum, neque dolores quos, vitae enim mollitia sunt ab!
                </AccordionContet>
              </AccordionItem>
            );
          })}
        </Accordion>
      </Title>
      <Title title="single accordion">
        <Accordion type="single">
          {data.map((d) => {
            return (
              <AccordionItem value={d.id} variant={d.variant as any}>
                <AccordionTrigger>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
                  cum enim libero repudiandae atque necessitatibus sunt eum
                  quibusdam reiciendis. Officiis.
                </AccordionTrigger>
                <AccordionContet>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Expedita perspiciatis illo nesciunt eaque esse molestias
                  repellat earum, cum cumque facilis numquam est, quisquam
                  atque, corrupti quas doloribus voluptates inventore ullam.
                  Quaerat dolorem, quae ex voluptate doloribus dolores ut
                  voluptas repellat, veniam perferendis corporis magnam vel eius
                  sequi illo! Et fugit quisquam voluptatibus corporis quis eos
                  nam tempore enim recusandae tenetur officiis ab, dolorem
                  doloremque quo minima consequuntur! Sit explicabo id vel
                  voluptatum, neque dolores quos, vitae enim mollitia sunt ab!
                </AccordionContet>
              </AccordionItem>
            );
          })}
        </Accordion>
      </Title>
    </div>
  );
};

export default AccordionExample;
