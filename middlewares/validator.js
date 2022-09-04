import { check, validationResult } from "express-validator";

export const validateRequest = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        result: errors.array().map((e) => ({ ...e })),
        message: validationResult(req)
          .array()
          .map((e) => e.msg)
          .join(),
      });
    }
    next();
  } catch (error) {
    return res.json({
      message: error.message || "Something went Wrong",
    });
  }
};

export const validateUser = [
  check("name").trim().not().isEmpty().withMessage("name is required"),
  check("gender")
    .trim()
    .not()
    .isEmpty()
    .withMessage("gender is required")
    .bail()
    .isIn(["Male", "Female"])
    .withMessage("gender should be either Male or Female"),
  check("contact").trim().not().isEmpty().withMessage("contact is required"),
  check("address").trim().not().isEmpty().withMessage("address is required"),
  check("photoUrl")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Photo url is required")
    .bail()
    .custom((value, { req }) => {
      const isMatched = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(
        value
      );
      if (!isMatched) {
        throw new Error("Please provide a valid photo url");
      }
      return true;
    }),
];

export const validateUserUpdate = [
  check("name")
    .optional()
    .exists()
    .bail()
    .trim()
    .not()
    .isEmpty()
    .withMessage("name can't be empty"),
  check("gender")
    .optional()
    .exists()
    .bail()
    .isIn(["Male", "Female"])
    .withMessage("gender should be either Male or Female"),
  check("contact")
    .optional()
    .exists()
    .trim()
    .not()
    .isEmpty()
    .withMessage("contact can't be empty"),
  check("address")
    .optional()
    .exists()
    .trim()
    .not()
    .isEmpty()
    .withMessage("address can't be empty"),
  check("photoUrl")
    .optional()
    .exists()
    .bail()
    .custom((value, { req }) => {
      const isMatched = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(
        value
      );
      if (!isMatched) {
        throw new Error("Please provide a valid photo url");
      }
      return true;
    }),
];

export const validateBulkUserUpdate = [
  check("*.name")
    .optional()
    .exists()
    .bail()
    .trim()
    .not()
    .isEmpty()
    .withMessage("name can't be empty"),
  check("*.gender")
    .optional()
    .exists()
    .bail()
    .isIn(["Male", "Female"])
    .withMessage("gender should be either Male or Female"),
  check("*.contact")
    .optional()
    .exists()
    .trim()
    .not()
    .isEmpty()
    .withMessage("contact can't be empty"),
  check("*.address")
    .optional()
    .exists()
    .trim()
    .not()
    .isEmpty()
    .withMessage("address can't be empty"),
  check("*.photoUrl")
    .optional()
    .exists()
    .bail()
    .custom((value, { req }) => {
      const isMatched = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(
        value
      );
      if (!isMatched) {
        throw new Error("Please provide a valid photo url");
      }
      return true;
    }),
];
