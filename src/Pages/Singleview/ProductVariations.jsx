import { useDispatch } from "react-redux";
import { onChangeVariation } from "../../helpers/cartHelper";
import { logger } from "../../helpers/commonHelper";

export function ProductVariations({ detail, setShow, handlerAddToCart }) {
  const dispatch = useDispatch();

  logger('attributes', detail.attributes);
  logger('variations', detail.variations);

  return (
    <>
      <div className="variants">
        <div className="variants_title">
          <h6>Variations</h6>
        </div>

        <div className="total_variation d-flex align-items-center gap-2">
          <p className="w-75 text-truncate">
            Total options:{" "}
            {detail?.attributes?.map(
              (attribute) => `${attribute?.terms?.length} ${attribute.name}; `
            )}
          </p>
        </div>

        <ul className="p-0">
          {detail?.attributes?.map((attribute, index) => {
            return (
              <li key={index}>
                <div className="divone my-3">
                  <p className="m-0">
                    <strong>
                      {index + 1}. {attribute.name}({attribute?.terms?.length}):
                    </strong>{" "}
                    {attribute.terms?.map((term, idx) => {
                      if (term?.active) return term.name;
                      return null;
                    })}
                  </p>

                  <div className="six_color d-flex align-items-center gap-1">
                    {attribute.terms?.map((term, idx) => {
                      return (
                        <div
                          className="six_color d-flex align-items-center gap-1 cursor-pointer"
                          key={idx}
                        >
                          <div
                            className={
                              "ram_col d-flex align-items-center justify-content-center " +
                              (term?.active ? "active" : "")
                            }
                            onClick={() => {
                              onChangeVariation({
                                dispatch,
                                detail,
                                termIndex: idx,
                                attributeIndex: index,
                              });
                            }}
                          >
                            <p className="m-0">{term.name}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

    </>
  );
}
