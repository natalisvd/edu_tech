import Link from "next/link";

const Card = ({ description, title, id }) => {
  return (
    <div className="mr-5 mb-5">
      {" "}
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p>{description}</p>
          <div className="card-actions justify-end">
            <Link href={`/courses/${id}`}>
              {/* <a className="btn btn-primary">Watch</a> */}
              Watch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
