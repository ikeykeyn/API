import { ClassConstructor, plainToClass } from 'class-transformer';
import { IMiddlware } from './middlware.interface';
import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';

export class ValidateMiddlware implements IMiddlware {
	constructor(private classToValidate: ClassConstructor<object>) {}
	execute({ body }: Request, res: Response, next: NextFunction): void {
		const instance = plainToClass(this.classToValidate, body);
		validate(instance).then((errors) => {
			if (errors.length) {
				res.status(422).send(errors);
			} else {
				next();
			}
		});
	}
}
