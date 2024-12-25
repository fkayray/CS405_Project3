/**
 * @class SceneNode
 * @desc A SceneNode is a node in the scene graph.
 * @property {MeshDrawer} meshDrawer - The MeshDrawer object to draw
 * @property {TRS} trs - The TRS object to transform the MeshDrawer
 * @property {SceneNode} parent - The parent node
 * @property {Array} children - The children nodes
 */

class SceneNode {
    constructor(meshDrawer, trs, parent = null) {
        this.meshDrawer = meshDrawer;
        this.trs = trs;
        this.parent = parent;
        this.children = [];

        if (parent) {
            this.parent.__addChild(this);
        }
    }

    __addChild(node) {
        this.children.push(node);
    }

    draw(mvp, modelView, normalMatrix, modelMatrix) {
        /**
         * @Task1 : Implement the draw function for the SceneNode class.
         */
       
        var transformedMvp = mvp;
        var transformedModelView = modelView;
        var transformedNormals = normalMatrix;
        var transformedModel = modelMatrix;

        var transformation_Matrix = this.trs.getTransformationMatrix(); 

        var t_transformedMvp = MatrixMult(transformedMvp, transformation_Matrix) ;
        var t_transformedModelView = MatrixMult(transformedModelView, transformation_Matrix) ;
        var t_transformedNormals = MatrixMult(transformedNormals, transformation_Matrix) ;
        var t_transformedModel = MatrixMult(transformedModel, transformation_Matrix) ;

        // Draw the MeshDrawer
        if (this.meshDrawer) {
            this.meshDrawer.draw(t_transformedMvp, t_transformedModelView, t_transformedNormals, t_transformedModel);
        }

        // Recursively draw child nodes
        for (const child of this.children) {
            child.draw(t_transformedMvp, t_transformedModelView, t_transformedNormals, t_transformedModel);
        }
    }
}