import { Mongo } from 'meteor/mongo';

export const RequesteeList = new Mongo.Collection('requestees');
export const ClassList = new Mongo.Collection('requested_classes');
export const RequesteeClassList = new Mongo.Collection('requestee_class_conn')